import React, { useEffect } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { QuestStackParamList } from "./QuestNavigator";
import { Pressable } from "react-native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentEventState,
  currentUser,
  questScreenVisibleQuestState,
  userQuestsProgressState,
  activeQuestsState,
} from "../recoil/atom";
import { QuestParticipation, QuestStatus } from "../client";
import { useQuery } from "react-query";
import { getUserEventQuests, getUserQuestProgress } from "../api/quests";

const QuestLogScreen = ({
  navigation,
}: NativeStackScreenProps<QuestStackParamList, "Quest log">) => {
  const user = useRecoilValue(currentUser);

  const currentEvent = useRecoilValue(currentEventState);
  const setActiveQuests = useSetRecoilState(activeQuestsState);

  const [userQuestsProgress, setUserQuestsProgress] = useRecoilState(
    userQuestsProgressState
  );

  const setQuestScreenVisibleQuest = useSetRecoilState(
    questScreenVisibleQuestState
  );

  const { data: userQuests } = useQuery<QuestParticipation[], Error>(
    ["userQuests", currentEvent],
    () =>
      user && currentEvent
        ? getUserEventQuests(user.id, currentEvent.id, QuestStatus.ACTIVE)
        : []
  );

  // TODO: Would want to use onSuccess in useQuery instead, but it doesn't seem to be reactive enough
  useEffect(() => {
    if (userQuests) {
      setActiveQuests(userQuests);
      if (user) {
        userQuests.forEach((q) => {
          getUserQuestProgress(user.id, q.quest.id).then((p) => {
            setUserQuestsProgress((existing) => ({
              ...existing,
              [q.quest.id]: p,
            }));
          });
        });
      }
    }
  }, [userQuests]);

  const DATA: { title: string; data: QuestParticipation[] }[] = [
    {
      title: "Active Quests",
      data: userQuests ?? [],
    },
  ];

  const QuestItem = ({
    questParticipation: qp,
    progress,
  }: {
    questParticipation: QuestParticipation;
    progress: { total: number; progress: number } | null;
  }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{qp.quest.title}</Text>
      {progress && (
        <Text style={styles.subtitle}>
          {progress.progress}/{progress.total} keys
        </Text>
      )}
    </View>
  );

  return (
    <View>
      <View style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(qp) => `${qp.quest.id}:${qp.user.id}`}
          renderItem={({ item: qp }) => (
            <Pressable
              onPress={() => {
                setQuestScreenVisibleQuest(qp);
                navigation.navigate("Quest");
              }}
            >
              <QuestItem
                questParticipation={qp}
                progress={
                  userQuestsProgress ? userQuestsProgress[qp.quest.id] : null
                }
              />
            </Pressable>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 6,
  },
  header: {
    fontSize: 16,
    color: "#696969",
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#696969",
  },
});

export default QuestLogScreen;
