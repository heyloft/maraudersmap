import { LocationObjectCoords, LocationObject } from "expo-location";
import { sendNotification } from "../notifications/notifications";
import { distance } from "./location";
import { Quest, QuestParticipation } from "../client";
import { fetchUnstartedQuests, updateQuestParticipation } from "../api/quests";

const TRESHOLD = 20;

export const locationUnlock = async (
  newLocation: LocationObject,
  userID: string,
  eventID: string
) => {
  const lockedQuests: QuestParticipation[] = await fetchUnstartedQuests(
    eventID,
    userID
  );

  const unlocked: Quest[] = [];
  lockedQuests?.forEach((qp) => {
    const location: LocationObjectCoords = {
      latitude: qp.quest.location[0],
      longitude: qp.quest.location[1],
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };
    const dist = distance(newLocation.coords, location);
    if (dist < TRESHOLD) {
      sendNotification("Quest Unlocked ✨", `You unlocked '${qp.quest.title}'`);
      unlocked.push(qp.quest);
      updateQuestParticipation(userID, qp.quest.id, 3);
    }
  });
  return unlocked.length > 0;
};
