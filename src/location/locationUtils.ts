/**
 * Calculates the distance in metres between 2 locations using the haversine formula.
 * @param loc1 - The firs location. Tuple with [lat, long] coordinates.
 * @param loc2 - The second location. Tuple with [lat, long] coordinates.
 * @returns - The distance in meters between loc1 and loc2.
 */
export const distance = (loc1: number[], loc2: number[]) => {
  const lat1 = (loc1[0] * Math.PI) / 180; // Convert to radians.
  const long1 = (loc1[1] * Math.PI) / 180;
  const lat2 = (loc2[0] * Math.PI) / 180;
  const long2 = (loc2[1] * Math.PI) / 180;
  const lat_diff = lat1 - lat2;
  const long_diff = long1 - long2;
  // Calculate haversine:
  const haversine =
    Math.pow(Math.sin(lat_diff / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(long_diff / 2), 2);
  const r = 6371000; // Radius of earth in metres.
  return 2 * r * Math.asin(Math.sqrt(haversine));
};
