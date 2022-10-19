import { Event, QuestItem, QuestParticipation } from "../client";
import genericFetch from "./utils/generic-fetch";

export const getAllEvents = (): Promise<Event[]> => {
  return genericFetch("events/");
};

export const getOneEvent = () => getAllEvents().then((events) => events[0]);

export const getUserEventActiveQuests = (
  user_id: string,
  event_id: string
): Promise<QuestParticipation[]> => {
  return genericFetch(`events/${event_id}/user/${user_id}/activeQuests`);
};

export const getQuestItems = (quest_id: string): Promise<QuestItem[]> => {
  return genericFetch(`quests/${quest_id}/items`);
};
