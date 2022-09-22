import { StyleSheet, View } from "react-native";
import Map from "./src/components/Map";
import LocationExample from "./src/location/LocationExample";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Map />
        </View>
        <LocationExample />
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
