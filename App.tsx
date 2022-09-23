import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import Map from "./src/components/Map";
import * as Location from "expo-location";
import { distance } from "./src/location/locationUtils";

const DIGS: Location.LocationObjectCoords = {
  latitude: 63.43133846620186,
  longitude: 10.400746365666315,
  altitude: null,
  accuracy: null,
  altitudeAccuracy: null,
  heading: null,
  speed: null,
};

const onPositionChange = (newLocation: Location.LocationObject) => {
  const dist = distance(DIGS, newLocation.coords);
  console.log(dist);
  if (dist < 10) {
    console.log("You have entered DIGS");
  }
};

export default function App() {
  const [locationGranted, setLocationGranted] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationGranted(true);
        Location.watchPositionAsync(
          { accuracy: Location.Accuracy.Highest, distanceInterval: 2 }, //TODO: Check out best locationOptions: https://docs.expo.dev/versions/latest/sdk/location/#locationoptions
          onPositionChange
        );
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
