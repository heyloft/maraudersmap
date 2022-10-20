import { Event, ItemOwnership, QuestItem, QuestParticipation } from "../client";
import getItemOwnerships from "./get-item-ownerships";
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

export const getUserQuestProgress = (
  user_id: string,
  quest_id: string
): Promise<{ total: number; progress: number }> => {
  return genericFetch(`quests/${quest_id}/items`).then(
    (questItems: QuestItem[]) => {
      const questKeys = questItems.filter((qi) => qi.item.item_type == 2);
      return getItemOwnerships(user_id).then((userItems: ItemOwnership[]) => {
        // TODO: Check which quest item is from
        const userKeys = userItems.filter((ui) => ui.item.item_type == 2);
        return {
          total: questKeys.length,
          progress: userKeys.length,
        };
      });
    }
  );
};
