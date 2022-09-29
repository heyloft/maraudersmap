import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ScannerScreen = () => {
  return (
    <View style={styles.container}>
      <Text>🤖</Text>
      <Text>Bip boop, scanning here!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default ScannerScreen;
