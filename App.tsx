import { StyleSheet, View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import Map from "./src/components/Map";
import LocationExample from "./src/location/LocationExample";

const queryClient = new QueryClient();

export default function App() {
  return (
    <View style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <View style={styles.mapContainer}>
          <Map />
        </View>
      </QueryClientProvider>
      <LocationExample />
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
