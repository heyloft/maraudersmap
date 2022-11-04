import { View, StyleSheet } from "react-native";
import { Modal, Text, Button } from "react-native-paper";
import { Quest } from "../client";

interface genericModalProps {
  quest: Quest;
  onReject: () => void;
  onAccept: () => void;
  acceptLoading?: boolean;
}

const QuestUnlockedModal = ({
  quest,
  onReject,
  onAccept,
  acceptLoading,
}: genericModalProps) => {
  return (
    <Modal visible={quest != null} onDismiss={onReject}>
      <View style={styles.container}>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text style={{ fontSize: 24, textAlign: "center" }}>
            ✨ Quest Unlocked ✨
          </Text>
          <View style={{ marginTop: 10 }}>
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
            <Text style={styles.questInfoText}>
              You followed the whispering wind and it presents you with a quest.
            </Text>
            <Text style={styles.questInfoText}>
              {
                "Somewhere on this floor lingers an item that doesn't belong in this realm, a hidden key in the form of a QR code."
              }
            </Text>
            <Text style={{ fontSize: 16, textAlign: "center", marginTop: 24 }}>
              Will you embark on this journey?
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            marginTop: 28,
          }}
        >
          <Button onPress={onReject} color="grey">
            Reject
          </Button>
          <Button
            mode="contained"
            onPress={onAccept}
            color="green"
            style={{ marginLeft: 12 }}
            icon="plus"
            loading={acceptLoading}
            disabled={acceptLoading}
          >
            Add Quest
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default QuestUnlockedModal;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingTop: 40,
    paddingBottom: 40,
    paddingStart: 20,
    paddingEnd: 20,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F6F6F4",
    margin: 30,
    borderRadius: 10,
  },
  questInfoText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
    fontStyle: "italic",
  },
});
