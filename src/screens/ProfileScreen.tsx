import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { useRecoilState } from "recoil";
import { currentUserInfo } from "../recoil/atom";

const ProfileScreen = () => {
  const [user, setUser] = useRecoilState(currentUserInfo);
  return (
    <View style={styles.container}>
      <Text>
        Logged in as <Text style={{ fontWeight: "bold" }}>{user.username}</Text>
      </Text>
      <Button
        style={styles.logoutButton}
        mode="contained"
        color="red"
        onPress={() => setUser((prev) => ({ ...prev, username: null }))}
        icon="logout"
        contentStyle={{ flexDirection: "row-reverse" }}
      >
        <Text style={styles.logoutButtonText}>Log out</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    height: "100%",
    display: "flex",
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  logoutButtonText: {
    fontSize: 14,
  },
});

export default ProfileScreen;
