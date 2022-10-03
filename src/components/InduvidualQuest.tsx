import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { List, Divider } from "react-native-paper";
import { Button } from "react-native-paper";

interface Quest {
  // TODO: Replace with proper Quest interface.
  title: string;
  date: Date;
  questItems: QuestItem[];
  description: string;
  possibleRewards: string[];
  showDialog: () => void;
}

export interface QuestItem {
  // TODO: Replace with proper interface.
  title: string;
  description: string;
  steps: [string, boolean][]; // Array of tuples where each tuple is [description, completed].
}

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

const InduvidualQuest = (props: Quest) => {
  return (
    <ScrollView style={styles.textView}>
      <View style={styles.horizontalContainer}>
        <Text style={styles.header}>{props.title}</Text>
        <Button
          mode="outlined"
          color="red"
          onPress={props.showDialog}
          style={styles.abandonButton}
        >
          Abandon
        </Button>
      </View>
      <Text>
        {props.date.toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </Text>
      <View style={styles.container}>
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
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Description:</Text>
        <Text>{props.description}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Rewards:</Text>
        <Text>Through your choosing, you will receive one of these items:</Text>
        {props.possibleRewards?.map((reward) => (
          <List.Item
            key={reward} // TODO: Set proper key.
            title={reward}
            left={(props) => <List.Icon {...props} icon="square" />}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default InduvidualQuest;

const styles = StyleSheet.create({
  textView: {
    padding: 10,
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    paddingTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    flex: 5,
  },
  abandonButton: {
    flex: 1,
    marginLeft: 10,
  },
});
