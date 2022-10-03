import React from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { QuestStackParamList } from "./QuestNavigator";
import { Pressable } from "react-native";

const QuestLogScreen = ({
  navigation,
}: NativeStackScreenProps<QuestStackParamList, "QuestLog">) => {
  const DATA = [
    {
      title: "Available Quests",
      data: ["Foxtrot Alpha", "Hotel Whiskey", "Victor Golf"],
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
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate("Quest")}>
              <Item title={item} />
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
