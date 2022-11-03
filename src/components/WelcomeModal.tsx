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
            {"Welcome to Cyber Quest"}
          </Text>
          <Text style={{ fontSize: 18, textAlign: "center", marginTop: 25 }}>
            Despite being inside, you feel a soft wind.
          </Text>
          <Text style={{ fontSize: 18, textAlign: "center", marginTop: 9 }}>
            It whispers words in the language of the dead.
          </Text>
          <Text style={{ fontSize: 18, textAlign: "center", marginTop: 9 }}>
            There might be something of intrigue to you in the place that
            honours the dead, the wind whispers.
          </Text>
          <Text style={{ fontSize: 27 }}>🗺️🔎</Text>
          <Button
            style={{ marginTop: 38 }}
            mode="contained"
            onPress={() => setShown(true)}
            color="green"
          >
            Procceed
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
