import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, Button } from "react-native-paper";
import ConfettiCannon from "react-native-confetti-cannon";

const QuestCompletedModal = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
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
              Congratulations! You have completed the Gathering of Easter Eggs.
            </Text>
            <Button
              mode="contained"
              onPress={() => setVisible(false)}
              color="green"
            >
              Continue
            </Button>
          </View>
        </Modal>
      </Portal>
      <Button style={{ marginTop: 30 }} onPress={() => setVisible(true)}>
        Show
      </Button>
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
