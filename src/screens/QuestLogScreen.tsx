import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ActivityIndicator,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { QuestStackParamList } from "./QuestNavigator";
import { Pressable } from "react-native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentUserState,
  questScreenVisibleQuestState,
  questsProgressState,
  activeQuestsState,
  completedQuestsState,
} from "../recoil/atom";
import { QuestParticipation } from "../client";
import { getUserQuestProgress } from "../api/quests";

const QuestLogScreen = ({
  navigation,
}: NativeStackScreenProps<QuestStackParamList, "Quest log">) => {
  const user = useRecoilValue(currentUserState);

  const activeQuests = useRecoilValue(activeQuestsState);

  const completedQuests = useRecoilValue(completedQuestsState);

  const [userQuestsProgress, setUserQuestsProgress] =
    useRecoilState(questsProgressState);

  const setQuestScreenVisibleQuest = useSetRecoilState(
    questScreenVisibleQuestState
  );

  useEffect(() => {
    const quests = [...(activeQuests ?? []), ...(completedQuests ?? [])];
    if (user) {
      quests.forEach((q) => {
        getUserQuestProgress(user.id, q.quest.id).then((p) => {
          setUserQuestsProgress((existing) => ({
            ...existing,
            [q.quest.id]: p,
          }));
        });
      });
    }
  }, [activeQuests]);

  const questsListData: { title: string; data: QuestParticipation[] }[] = [
    {
      title: "✨ Active Quests",
      data: activeQuests ?? [],
    },
    {
      title: "🏁 Completed Quests",
      data: completedQuests ?? [],
    },
  ].filter((s) => s.data.length > 0);

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

  const loadingQuests = activeQuests == null || completedQuests == null;

  return (
    <View>
      {loadingQuests ? (
        <View style={{ marginTop: 32 }}>
          <ActivityIndicator size={"large"} color="#1E88E5" />
        </View>
      ) : (
        <View style={styles.container}>
          <SectionList
            sections={questsListData}
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
            ListEmptyComponent={
              <View style={{ display: "flex", alignItems: "center" }}>
                <Text style={{ fontSize: 24, marginTop: 6 }}>Log is empty</Text>
                <Text style={{ color: "grey", marginTop: 6 }}>
                  Go find your next adventure!
                </Text>
                <Text style={{ fontSize: 50, marginTop: 12 }}>📜</Text>
              </View>
            }
          />
        </View>
      )}
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
