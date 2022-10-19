import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { useRecoilState } from "recoil";
import ErrorAlert from "../components/ErrorAlert";
import { currentUser } from "../recoil/atom";

const ProfileScreen = () => {
  const [user, setUser] = useRecoilState(currentUser);
  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>
            Logged in as{" "}
            <Text style={{ fontWeight: "bold" }}>{user.username}</Text>
          </Text>
          <Text style={{ color: "#aaa", fontSize: 12 }}>({user.id})</Text>
          <Button
            style={styles.logoutButton}
            mode="contained"
            color="red"
            onPress={() => setUser(null)}
            icon="logout"
            contentStyle={{ flexDirection: "row-reverse" }}
          >
            <Text style={styles.logoutButtonText}>Log out</Text>
          </Button>
        </>
      ) : (
        <ErrorAlert>Not logged in</ErrorAlert>
      )}
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
