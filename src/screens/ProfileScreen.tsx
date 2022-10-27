import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import ErrorAlert from "../components/ErrorAlert";
import { currentUserState, resetUserStateTransaction } from "../recoil/atom";

const ProfileScreen = () => {
  const user = useRecoilValue(currentUserState);

  // Note: using "unstable" feature here, but current limitations don't affect this use case
  // (https://recoiljs.org/docs/api-reference/core/useRecoilTransaction#current-limitations-and-future-vision)
  const resetUserState = useRecoilTransaction_UNSTABLE(
    resetUserStateTransaction
  );

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
            onPress={() => resetUserState()}
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
