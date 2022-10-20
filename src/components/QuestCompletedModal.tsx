import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, Button } from "react-native-paper";
import ConfettiCannon from "react-native-confetti-cannon";
import { Quest } from "../client";

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
            <Text style={{ fontSize: 27, fontWeight: "500" }}>
              Quest Completed!
            </Text>
            <Text style={{ fontSize: 20, textAlign: "center", margin: 15 }}>
              Congratulations! You have completed &apos;{quest.title}&apos;.
            </Text>
            <Button mode="contained" onPress={onDismiss} color="green">
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
    backgroundColor: "#F6F6F4",
    flex: 1,
    margin: 30,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
