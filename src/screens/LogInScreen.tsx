import { AxiosError } from "axios";
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import getUser from "../api/get-user";
import createUser from "../api/utils/createUser";
import { UserCreate } from "../client";
import { currentUser } from "../recoil/atom";

const LogInScreen = () => {
  const [, setUser] = useRecoilState(currentUser);
  const [usernameInput, setUsernameInput] = useState("");

  const { mutate: createUserMutate } = useMutation(createUser, {
    onSuccess: ({ data: user }) => setUser(user),
    onError: (e) => {
      console.error(e);
    },
  });

  const usernameIsValid = (username: string) => {
    return username != null && username.trim().length > 0;
  };

  // Login if user with username exists, otherwise create user first
  const loginOrSignup = ({ username }: UserCreate) => {
    const sanitizedUsername = username.trim();
    if (!usernameIsValid(sanitizedUsername)) {
      return;
    }
    getUser(sanitizedUsername)
      .then(setUser)
      .catch((reason: AxiosError) => {
        switch (reason.response?.status) {
          case 404: // Not Found
            createUserMutate(sanitizedUsername);
            break;
          default:
            console.error(reason.message);
            break;
        }
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerChild}>
        <TextInput
          style={styles.loginUsernameInput}
          label="Username"
          value={usernameInput}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setUsernameInput(text)}
        />
      </View>
      <Button
        mode="contained"
        onPress={() => loginOrSignup({ username: usernameInput })}
        style={styles.loginButton}
        icon={"login"}
        disabled={!usernameIsValid(usernameInput)}
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
