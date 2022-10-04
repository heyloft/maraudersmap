import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";

const LogInScreen = () => {
  const [username, setUsername] = useState("");
  return (
    <>
      <TextInput
        label="Username"
        value={username}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => setUsername(text)}
      />
      <Button mode="contained" onPress={() => console.log(username)}>
        Log in
      </Button>
    </>
  );
};

export default LogInScreen;
