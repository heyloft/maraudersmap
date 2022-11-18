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
  questParticipation: QuestParticipation;
  questProgress: QuestParticipationProgress | null;
  showDialog: () => void;
}

const QuestDetails = (props: QuestDetailsProps) => {
  const user = useRecoilValue(currentUserState);
  const { data, isLoading, isError } = useQuery<ItemOwnership[]>(
    ["item-ownerships", user?.id],
    () => (user ? getItemOwnerships(user.id) : [])
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
      <View style={styles.container}>
        <>
          <Divider />
          <List.Item
            title={"🔑 Unlocked Keys"}
            right={() =>
              props.questProgress ? (
                <Text>
                  {props.questProgress.progress}/{props.questProgress.total}
                </Text>
              ) : null
            }
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
