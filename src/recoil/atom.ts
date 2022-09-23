import { atom } from "recoil";
import { LocationObject } from "expo-location";

const defaultLocation: LocationObject = {
  timestamp: Date.now(),
  coords: {
    latitude: 63.43133846620186,
    longitude: 10.400746365666315,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    accuracy: null,
    speed: null,
  },
};

export const currentLocation = atom({
  key: "currentLocation", // unique ID (with respect to other atoms/selectors)
  default: defaultLocation, // default value (aka initial value)
});
