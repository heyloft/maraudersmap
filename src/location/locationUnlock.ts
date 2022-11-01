import { LocationObjectCoords } from "expo-location";
import { distance } from "./location";
import { Quest } from "../client";

const defaultUnlockRadiusMeters = 5;

export const questsWithinUnlockRadius = (
  location: LocationObjectCoords,
  quests: Quest[],
  radiusMeters: number = defaultUnlockRadiusMeters
) => {
  return quests.filter((quest) => {
    const questLocation: LocationObjectCoords = {
      latitude: quest.location[0],
      longitude: quest.location[1],
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };
    return distance(location, questLocation) < radiusMeters;
  });
};
