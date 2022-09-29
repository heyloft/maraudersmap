import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { List, Divider } from "react-native-paper";

interface Quest {
  // TODO: Replace with proper Quest interface.
  title: string;
  date: Date;
  questItems: QuestItem[];
  description: string;
  possibleRewards: string[];
}

export interface QuestItem {
  // TODO: Replace with proper interface.
  title: string;
  description: string;
  steps: [string, boolean][]; // Array of tuples where each tuple is [description, completed].
}

// Some hardcoded questitems. Can be used for testing.
const hiddenKey: QuestItem = {
  title: "Hidden Key",
  description: "To enter you have to find the hidden key.",
  steps: [
    ["Defeat cave troll", true],
    ["Win quidditch match", true],
    ["kajfk", false],
  ],
};

const questItem2: QuestItem = {
  title: "Quest Item 2",
  description: "To enter you have to find the hidden key.",
  steps: [
    ["Defeat cave troll", true],
    ["Win quidditch match", false],
  ],
};

const questItem3: QuestItem = {
  title: "Quest Item 3",
  description: "To enter you have to find the hidden key.",
  steps: [
    ["Defeat cave troll", false],
    ["Win quidditch match", false],
  ],
};

/**
 * Check the progress of a QuestItem by calculationg the fraction completed steps / total steps.
 * @param item - The QuestItem you want th check progress of.
 * @returns A stringified fraction with steps completed / total steps.
 */
const stepsCompleted = (item: QuestItem) => {
  const totalSteps = item.steps.length;
  let completedCount = 0;
  for (let index = 0; index < item.steps.length; index++) {
    if (item.steps[index][1] == true) {
      completedCount++;
    }
  }
  return `${completedCount}/${totalSteps}`;
};

const QuestScreen = (props: Quest) => {
  return (
    <ScrollView style={styles.textView}>
      <Text style={styles.header}>{props.title}</Text>
      <Text style={styles.date}>
        {props.date.toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </Text>
      {props.questItems.map((item) => (
        // TODO: Set proper key.
        <React.Fragment key={item.title}>
          <Divider />
          <List.Item
            title={item.title}
            right={() => <Text>{stepsCompleted(item)}</Text>}
            onPress={() => console.log(`${item.title} was pressed.`)}
          />
        </React.Fragment>
      ))}
      <Text style={styles.header}>Description:</Text>
      <Text style={styles.description}>{props.description}</Text>
      <Text style={styles.header}>Rewards:</Text>
      <Text>Through your choosing, you will receive one of these items:</Text>
      {props.possibleRewards?.map((reward) => (
        <List.Item
          key={reward} // TODO: Set proper key.
          title={reward}
          left={(props) => <List.Icon {...props} icon="square" />}
        />
      ))}
    </ScrollView>
  );
};

export default QuestScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  date: {
    marginBottom: 10,
  },
  description: {},
  textView: {
    marginTop: 50,
    marginBottom: 10,
  },
});
