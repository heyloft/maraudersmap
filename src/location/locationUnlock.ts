import { LocationObjectCoords, LocationObject } from "expo-location";
import { sendNotification } from "../notifications/notifications";
import { distance } from "./location";
import { QuestParticipation } from "../client";
import updateQuestParticipation from "../api/updateQuestParticipation";
import fetchUnstartedQuests from "../api/fetchUnstartedQuests";

const TRESHOLD = 50;
const EVENTID = "cc0d3b66-3edf-4259-a5f4-09e1ee32ffd3";

export const locationUnlock = async (
  newLocation: LocationObject,
  userID: string
) => {
  const res: QuestParticipation[] = await fetchUnstartedQuests(EVENTID, userID);
  const lockedQuests = new Set(res);
  lockedQuests?.forEach((quest) => {
    const location: LocationObjectCoords = {
      latitude: quest.quest.location[0],
      longitude: quest.quest.location[1],
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };
    const dist = distance(newLocation.coords, location);
    if (dist < TRESHOLD) {
      sendNotification(
        "Congratulations you unlocked a new Quest!",
        `${quest.quest.title} is now unlocked!`
      );
      lockedQuests.delete(quest);
      updateQuestParticipation(userID, quest.quest.id, 3);
    }
  });
};
