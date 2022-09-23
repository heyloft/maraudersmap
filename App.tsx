import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import Map from "./src/components/Map";
import * as Location from "expo-location";

export default function App() {
  const [locationGranted, setLocationGranted] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationGranted(true);
      }
    })();
  }, []);

  if (!locationGranted) {
    return (
      <View style={styles.container}>
        <Text>
          The app needs access to device location in order to work properly.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map />
      </View>
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
  mapContainer: {
    width: "100%",
    height: "100%",
  },
});
