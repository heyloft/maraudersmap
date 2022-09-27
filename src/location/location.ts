import {
  Accuracy,
  LocationObjectCoords,
  LocationObject,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

/**
 * Calculates the distance in metres between 2 locations using the haversine formula.
 * @param loc1 - The firs location. Tuple with [lat, long] coordinates.
 * @param loc2 - The second location. Tuple with [lat, long] coordinates.
 * @returns - The distance in meters between loc1 and loc2.
 */
export const distance = (
  loc1: LocationObjectCoords,
  loc2: LocationObjectCoords
) => {
  const lat1 = (loc1.latitude * Math.PI) / 180; // Convert to radians.
  const long1 = (loc1.longitude * Math.PI) / 180;
  const lat2 = (loc2.latitude * Math.PI) / 180;
  const long2 = (loc2.longitude * Math.PI) / 180;
  const lat_diff = lat1 - lat2;
  const long_diff = long1 - long2;
  // Calculate haversine:
  const haversine =
    Math.pow(Math.sin(lat_diff / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(long_diff / 2), 2);
  const r = 6371000; // Radius of earth in metres.
  return 2 * r * Math.asin(Math.sqrt(haversine));
};

/**
 * Asks for location permission and sets up callback function that will be called each time a new position is received.
 *
 * @param onLocationUpdate - Callback function that is called each time a new location is received.
 */
export const locationSetup = async (
  onLocationUpdate: (new_location: LocationObject) => void
) => {
  const { status } = await requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Application wont work as intendet without LocationPermissions.");
    return;
  }
  watchPositionAsync(
    { accuracy: Accuracy.Highest, distanceInterval: 2 }, // TODO: Check best parameters for options.
    onLocationUpdate
  );
};
