import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { List, Divider, ActivityIndicator } from "react-native-paper";
import { Button } from "react-native-paper";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { getItemOwnerships } from "../api/items";
import { ItemOwnership, ItemType, QuestParticipation } from "../client";
import { currentUserState, QuestParticipationProgress } from "../recoil/atom";
import ItemCard from "./ItemCard";

interface QuestDetailsProps {
  // TODO: Replace with proper Quest interface.
  questParticipation: QuestParticipation;
  questProgress: QuestParticipationProgress | null;
  // questItems: QuestItem[];
  // possibleRewards: string[];
  showDialog: () => void;
}

// export interface QuestItem {
//   // TODO: Replace with proper interface.
//   title: string;
//   description: string;
//   steps: [string, boolean][]; // Array of tuples where each tuple is [description, completed].
// }

/**
 * Check the progress of a QuestItem by calculationg the fraction completed steps / total steps.
 * @param item - The QuestItem you want th check progress of.
 * @returns A stringified fraction with steps completed / total steps.
 */
// const stepsCompleted = (item: QuestItem) => {
//   const totalSteps = item.steps.length;
//   let completedCount = 0;
//   for (let index = 0; index < item.steps.length; index++) {
//     if (item.steps[index][1] == true) {
//       completedCount++;
//     }
//   }
//   return `${completedCount}/${totalSteps}`;
// };

const QuestDetails = (props: QuestDetailsProps) => {
  const user = useRecoilValue(currentUserState);
  const { data, isLoading, isError } = useQuery<ItemOwnership[]>(
    ["item-ownerships", user?.id],
    () => (user ? getItemOwnerships(user.id) : []) //TODO: Better handling of null user
  );
  const questKeysCollected = data
    ? data.filter((itemOwnership) => {
        const questItem = itemOwnership.quest_item;
        return (
          questItem.item.item_type == ItemType.KEY &&
          questItem.quest_id == props.questParticipation.quest.id
        );
      })
    : [];
  return (
    <ScrollView style={styles.textView}>
      <View style={styles.horizontalContainer}>
        <Text style={styles.header}>
          {props.questParticipation.quest.title}
        </Text>
        <Button
          mode="outlined"
          color="red"
          onPress={props.showDialog}
          style={styles.abandonButton}
        >
          Abandon
        </Button>
      </View>
      {/* <Text>
        {props.date.toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </Text> */}
      <View style={styles.container}>
        <>
          <Divider />
          <List.Item
            title={"Unlocked Keys"}
            right={() =>
              props.questProgress ? (
                <Text>
                  {props.questProgress.progress}/{props.questProgress.total}
                </Text>
              ) : null
            }
            // onPress={() => console.log(`${item.title} was pressed.`)}
          />
          <View>
            {isError ? (
              <Text>Error getting unlocked keys</Text>
            ) : !isLoading ? (
              <>
                {questKeysCollected.map((key) => (
                  <ItemCard
                    key={key.id}
                    title={key.quest_item.item.title}
                    description={key.quest_item.item.description}
                  />
                ))}
                {props.questProgress &&
                  Array.from(
                    {
                      length: Math.max(
                        props.questProgress.total -
                          props.questProgress.progress,
                        0
                      ),
                    },
                    (_, i) => (
                      <View key={i} style={{ opacity: 0.4 }}>
                        <ItemCard key={i} title={`🔒 Locked Key`} />
                      </View>
                    )
                  )}
              </>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </>
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Description:</Text>
        <Text>{props.questParticipation.quest.description}</Text>
      </View>
      {/* <View style={styles.container}>
        <Text style={styles.header}>Rewards:</Text>
        <Text>Through your choosing, you will receive one of these items:</Text>
        {props.possibleRewards?.map((reward) => (
          <List.Item
            key={reward} // TODO: Set proper key.
            title={reward}
            left={(props) => <List.Icon {...props} icon="square" />}
          />
        ))}
      </View> */}
    </ScrollView>
  );
};

export default QuestDetails;

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
