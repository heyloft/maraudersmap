import { LocationObjectCoords, LocationObject } from "expo-location";
import { POI } from "../client/models/POI";
import { sendNotification } from "../notifications/notifications";
import { distance } from "./location";

const TRESHOLD = 150;

const lockedLocations = new Set<POI>([
  {
    title: "Drivhuset",
    description: "Drivhuset mastersal",
    position: [63.4164036797957, 10.403429675502757],
    id: 4,
  },
  {
    title: "Digs",
    description: "Digs is the main office of Heyloft and many other startups.",
    position: [63.43133846620186, 10.400746365666315],
    id: 1,
  },
  {
    title: "Realfagsbiblioteket",
    description: "Realfagsbibliotekte at NTNU Gløshaugen.",
    position: [63.41584105578468, 10.406138792442658],
    id: 2,
  },
  {
    title: "Stripa",
    description: "Sentralbygg aka. stripa at NTNU Gløshaugen.",
    position: [63.4176158516293, 10.40398152938794],
    id: 3,
  },
]);

export const locationUnlock = (newLocation: LocationObject) => {
  lockedLocations.forEach((item) => {
    const location: LocationObjectCoords = {
      latitude: item.position[0],
      longitude: item.position[1],
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };
    const dist = distance(newLocation.coords, location);
    if (dist < TRESHOLD) {
      sendNotification(
        "Congratulations you unlocked a new Location!",
        `${item.title} is now unlocked!`
      );
      lockedLocations.delete(item);
      // TODO: Add quest to questlog:
    }
  });
};
