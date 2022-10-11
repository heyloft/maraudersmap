import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useRecoilState } from "recoil";
import { currentUserInfo } from "../recoil/atom";

const LogInScreen = () => {
  const [, setUser] = useRecoilState(currentUserInfo);
  const [username, setUsername] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.containerChild}>
        <TextInput
          style={styles.loginUsernameInput}
          label="Username"
          value={username}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <Button
        mode="contained"
        onPress={() => setUser({ username })}
        style={styles.loginButton}
        icon={"login"}
      >
        <Text style={styles.loginButtonText}>Log in</Text>
      </Button>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  containerChild: {
    height: 70,
    width: "90%",
    maxWidth: 280,
  },
  loginUsernameInput: {
    fontSize: 16,
    padding: 0,
  },
  loginButton: {
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 14,
  },
});
