import { Modal, Text, Button, Portal } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import { currentUser } from "../recoil/atom";
import React, { useState } from "react";

const WelcomeModal = () => {
  const user = useRecoilValue(currentUser);
  const [isShown, setShown] = useState<boolean>(false);

  return (
    <Portal>
      <Modal
        visible={user != null && isShown == false}
        onDismiss={() => setShown(true)}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.container}>
          <Text style={{ fontSize: 27, fontWeight: "500" }}>Welcome!</Text>
          <Text style={{ fontSize: 20, textAlign: "center", margin: 15 }}>
            Introduction text...
          </Text>
          <Button mode="contained" onPress={() => setShown(true)} color="green">
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
