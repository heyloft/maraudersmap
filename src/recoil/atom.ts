import { atom } from "recoil";

export const currentLocation = atom({
  key: "currentLocation", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
