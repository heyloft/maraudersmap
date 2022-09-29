import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "../../App";

const ScannerScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Scanner">) => {
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
