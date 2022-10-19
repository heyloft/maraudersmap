import React from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { QuestStackParamList } from "./QuestNavigator";
import { Pressable } from "react-native";
import { useRecoilValue } from "recoil";
import { userQuestsState } from "../recoil/atom";
import { QuestParticipation } from "../client";

const QuestLogScreen = ({
  navigation,
}: NativeStackScreenProps<QuestStackParamList, "Quest log">) => {
  const userQuests = useRecoilValue(userQuestsState);

  const DATA: { title: string; data: QuestParticipation[] }[] = [
    {
      title: "Active Quests",
      data: userQuests ?? [],
    },
  ];

  const Item = ({ title }: { title: string }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{title}</Text>
    </View>
  );

  return (
    <View>
      <View style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item) => `${item.quest.id}:${item.user.id}`}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate("Quest")}>
              <Item title={item.quest.title} />
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
