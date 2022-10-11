import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import ConfettiCannon from "react-native-confetti-cannon";

const QuestCompletedModal = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.container}
          >
            <ConfettiCannon
              count={50}
              fadeOut={true}
              explosionSpeed={1000}
              fallSpeed={3500}
              origin={{ x: -0, y: 0 }}
            ></ConfettiCannon>
            <View style={{ justifyContent: "flex-start" }}>
              <Text
                style={{ fontSize: 30, textAlign: "center", paddingTop: 30 }}
              >
                Quest Completed!
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ fontSize: 20, textAlign: "center" }}>
                Congratulations you completed Gathering of Easter Eggs!
                🥳🥳🥳🥳🥳🥳🥳
              </Text>
              <Button
                mode="contained"
                onPress={hideModal}
                style={{ marginTop: 50 }}
                color="green"
              >
                Continue
              </Button>
            </View>
          </Modal>
        </Portal>
        <Button style={{ marginTop: 30 }} onPress={showModal}>
          Show
        </Button>
      </Provider>
    </>
  );
};

export default QuestCompletedModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    margin: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    borderRadius: 10,
  },
});
