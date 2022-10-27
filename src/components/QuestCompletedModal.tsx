import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, Button } from "react-native-paper";
import ConfettiCannon from "react-native-confetti-cannon";
import { ItemType, Quest, UnlockMethod } from "../client";

const ITEM_TYPE_EMOJIS = {
  [ItemType.KEY]: "🔑",
  [ItemType.COLLECTIBLE]: "🏺",
  [ItemType.POI]: "🏟️",
  [ItemType.VOUCHER]: "🎟️",
};

const QuestCompletedModal = ({
  quest,
  onDismiss,
}: {
  quest: Quest;
  onDismiss: () => void;
}) => {
  return (
    <>
      <Portal>
        <Modal
          visible={quest != null}
          onDismiss={onDismiss}
          contentContainerStyle={styles.modalContainer}
        >
          <ConfettiCannon
            count={50}
            fadeOut={true}
            explosionSpeed={1500}
            fallSpeed={2000}
            origin={{ x: 0, y: 0 }}
          />
          <View style={styles.container}>
            <View style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: 24, textAlign: "center" }}>
                🎉 Congratulations 🎉
              </Text>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{ fontSize: 20, textAlign: "center", marginTop: 24 }}
                >
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
            <View
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 20,
                borderRadius: 8,
                backgroundColor: "#e0fce0",
                padding: 16,
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 18, color: "grey" }}>Rewards</Text>
              <View style={{ marginTop: 6, marginBottom: 4 }}>
                {quest.items
                  .filter(
                    (i) => i.unlock_method === UnlockMethod.QUEST_COMPLETION
                  )
                  .map((i) => (
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
            <Button
              mode="contained"
              onPress={onDismiss}
              color="green"
              style={{ marginTop: 38 }}
            >
              Continue
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default QuestCompletedModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  container: {
    padding: 40,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 30,
    borderRadius: 10,
    backgroundColor: "#F6F6F4",
  },
});
