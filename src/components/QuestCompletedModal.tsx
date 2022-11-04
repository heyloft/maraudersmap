import { View, StyleSheet, Platform } from "react-native";
import { Modal, Text, Button } from "react-native-paper";
import ConfettiCannon from "react-native-confetti-cannon";
import { ItemType, Quest, UnlockMethod } from "../client";
import React from "react";

const ITEM_TYPE_EMOJIS = {
  [ItemType.KEY]: "🔑",
  [ItemType.COLLECTIBLE]: "🏺",
  [ItemType.POI]: "🏟️",
  [ItemType.VOUCHER]: "🎟️",
};

const QuestCompletedModal = ({
  quest,
  onDismiss,
  onNavigateToBag,
}: {
  quest: Quest;
  onDismiss: () => void;
  onNavigateToBag: () => void;
}) => {
  const completionItems = quest.items.filter(
    (i) => i.unlock_method === UnlockMethod.QUEST_COMPLETION
  );

  return (
    <Modal visible={quest != null} onDismiss={onDismiss}>
      <View style={styles.container}>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text style={{ fontSize: 24, textAlign: "center" }}>
            🎉 Congratulations 🎉
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 20, textAlign: "center", marginTop: 24 }}>
              You have completed
            </Text>
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              {quest.title}
            </Text>
          </View>
        </View>
        {completionItems.length > 0 && (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 20,
              borderRadius: 8,
              backgroundColor: "#e0fce0",
              paddingTop: 16,
              paddingBottom: 16,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 18, color: "grey" }}>Rewards</Text>
            <View style={{ marginTop: 6, marginBottom: 4 }}>
              {completionItems.map((i) => (
                <Text
                  key={i.id}
                  style={{ fontSize: 18, fontWeight: "bold", marginTop: 4 }}
                >
                  {ITEM_TYPE_EMOJIS[i.item.item_type] + " "}
                  {i.item.title}
                </Text>
              ))}
            </View>
          </View>
        )}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            marginTop: 38,
          }}
        >
          <Button onPress={onDismiss} color="grey">
            Close
          </Button>
          {completionItems.length > 0 && (
            <Button
              mode="contained"
              onPress={onNavigateToBag}
              color="green"
              style={{ marginLeft: 12 }}
            >
              Go to Bag
            </Button>
          )}
        </View>
      </View>
      {Platform.OS == "ios" && (
        // Android version is way too laggy
        <ConfettiCannon
          count={50}
          fadeOut={true}
          explosionSpeed={1500}
          fallSpeed={2000}
          origin={{ x: 0, y: 0 }}
        />
      )}
    </Modal>
  );
};

export default QuestCompletedModal;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingStart: 16,
    paddingEnd: 16,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 30,
    borderRadius: 10,
    backgroundColor: "#F6F6F4",
  },
});
