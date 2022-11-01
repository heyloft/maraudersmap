import { Modal, Text, Button, Portal } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atom";
import React, { useState } from "react";

const WelcomeModal = () => {
  const user = useRecoilValue(currentUserState);
  const [isShown, setShown] = useState<boolean>(false);

  return (
    <Portal>
      <Modal
        visible={user != null && !isShown}
        onDismiss={() => setShown(true)}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.container}>
          <Text style={{ fontSize: 27 }}>👋</Text>
          <Text style={{ fontSize: 26, textAlign: "center" }}>
            Welcome <Text style={{ color: "green" }}>{user?.username}</Text>
          </Text>
          <Text style={{ fontSize: 20, textAlign: "center", marginTop: 25 }}>
            {"Hi, and welcome to Marauder's Map!"}
          </Text>
          <Text style={{ fontSize: 20, textAlign: "center", marginTop: 25 }}>
            You have to do a location unlock to be able to start the journey...
          </Text>
          <Text style={{ fontSize: 27 }}>🗺️🔎</Text>
          <Button
            style={{ marginTop: 38 }}
            mode="contained"
            onPress={() => setShown(true)}
            color="green"
          >
            Get started
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default WelcomeModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  container: {
    padding: 40,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F6F6F4",
    margin: 30,
    borderRadius: 10,
  },
});
