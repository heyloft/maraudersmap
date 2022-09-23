import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import Map from "./src/components/Map";
import * as Location from "expo-location";
import LocationExample from "./src/location/LocationExample";
import { RecoilRoot } from "recoil";

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
    <RecoilRoot>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Map />
        </View>
      </View>
    </RecoilRoot>
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
