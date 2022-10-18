import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import getUser from "../api/get-user";
import createUser from "../api/utils/createUser";
import { User, UserCreate } from "../client";
import { currentUserInfo } from "../recoil/atom";

const LogInScreen = () => {
  const [, setUser] = useRecoilState(currentUserInfo);
  const [username, setUsername] = useState("");
  const { refetch } = useQuery<User>(
    ["user", username],
    () => getUser(username),
    {
      enabled: false,
      onSuccess: (data) => {
        setUser({ userID: data.id, username: data.username });
      },
    }
  );
  const { mutate } = useMutation(createUser, {
    onSuccess: (data) => {
      const res = data.data;
      setUser({ userID: res.id, username: res.username });
    },
    onError: () => {
      refetch();
    },
  });

  const submitNewUser = (data: UserCreate) => {
    mutate(data.username);
  };
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
        onPress={() => submitNewUser({ username })}
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
