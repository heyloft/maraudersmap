import { AxiosError } from "axios";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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

  const [fetchUserLoading, setFetchUserLoading] = useState(false);

  const { mutate: createUserMutate, isLoading: createUserLoading } =
    useMutation(createUser, {
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
    setFetchUserLoading(true);
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
      })
      .finally(() => {
        setFetchUserLoading(false);
      });
  };

  const loading = fetchUserLoading || createUserLoading;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titleIcon}>🗺️</Text>
        <Text style={styles.titleText}>Welcome to Cyber Quest</Text>
        <Text style={styles.infoText}>
          virtual journeys in physical realities
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.usernameInputContainer}>
          <Text style={styles.infoText}>
            What is your name, mysterious traveller?
          </Text>
          <TextInput
            style={styles.usernameInput}
            underlineColor={"#1E88E5"}
            activeUnderlineColor={"#1E88E5"}
            label="Name"
            value={usernameInput}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setUsernameInput(text)}
          />
          <Text style={styles.infoText}>
            give yourself a unique and strange username to begin your journey
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={() => loginOrSignup({ username: usernameInput })}
          style={styles.loginButton}
          color={"#1E88E5"}
          icon={"login"}
          disabled={!usernameIsValid(usernameInput)}
          loading={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? "Signing up" : "Sign up"}
          </Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? -60 : 0,
    textAlign: "center",
  },
  titleIcon: {
    fontSize: 69,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    color: "grey",
  },
  formContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 40,
  },
  usernameInputContainer: {
    width: "90%",
    maxWidth: 280,
  },
  usernameInput: {
    fontSize: 16,
    padding: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 14,
  },
});
