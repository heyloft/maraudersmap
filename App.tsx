import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import Map from "./src/components/Map";
import { RecoilRoot } from "recoil";
import { notificationSetup } from "./src/notifications/notifications";

export default function App() {
  useEffect(() => {
    notificationSetup();
  }, []);

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
