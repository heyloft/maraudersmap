import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useRecoilState } from "recoil";
import { currentUserInfo } from "../recoil/atom";

const LogInScreen = () => {
  const [, setUser] = useRecoilState(currentUserInfo);
  const [username, setUsername] = useState("");
  return (
    <View style={{ marginTop: "40%" }}>
      <TextInput
        label="Username"
        value={username}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => setUsername(text)}
      />
      <Button mode="contained" onPress={() => setUser({ username })}>
        Log in
      </Button>
    </View>
  );
};

export default LogInScreen;
