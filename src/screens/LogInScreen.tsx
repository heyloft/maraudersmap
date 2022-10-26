import { AxiosError } from "axios";
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { createUser, getUser } from "../api/users";
import { UserCreate } from "../client";
import { currentUserState, isNewUserState } from "../recoil/atom";

const LogInScreen = () => {
  const setUser = useSetRecoilState(currentUserState);
  const setIsNewUser = useSetRecoilState(isNewUserState);
  const [usernameInput, setUsernameInput] = useState("");

  const { mutate: createUserMutate } = useMutation(createUser, {
    onSuccess: (user) => setUser(user),
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
      .then((user) => {
        setIsNewUser(false);
        setUser(user);
      })
      .catch((reason: AxiosError) => {
        switch (reason.status) {
          case 404: // Not Found
            setIsNewUser(true);
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
