import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Test from "./src/components/test/Test";
import LocationExample from "./src/location/LocationExample";

export default function App() {
  return (
    <View style={styles.container}>
      <Test />
      <LocationExample />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
