import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import Map from "./src/components/Map";
import * as Location from "expo-location";
import LocationExample from "./src/location/LocationExample";
import { RecoilRoot } from "recoil";

export default function App() {
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
