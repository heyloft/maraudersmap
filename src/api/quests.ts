import {
  DefaultService as API,
  ItemOwnership,
  QuestItem,
  QuestParticipation,
  QuestStatus,
} from "../client";
import { getItemOwnerships } from "./items";

export const getUserEventActiveQuests = (
  user_id: string,
  event_id: string
): Promise<QuestParticipation[]> => {
  return API.readUserQuestParticipationsUsersUserIdQuestParticipationsGet(
    user_id,
    event_id,
    QuestStatus._3
  );
};

export const getQuestItems = (quest_id: string): Promise<QuestItem[]> => {
  return API.readQuestItemsQuestsQuestIdItemsGet(quest_id);
};

export const getUserQuestProgress = (
  user_id: string,
  quest_id: string
): Promise<{ total: number; progress: number }> => {
  return getQuestItems(quest_id).then((questItems: QuestItem[]) => {
    const questKeys = questItems.filter((qi) => qi.item.item_type == 2);
    return getItemOwnerships(user_id).then((userItems: ItemOwnership[]) => {
      // TODO: Check which quest item is from
      const userKeys = userItems.filter((ui) => ui.item.item_type == 2);
      return {
        total: questKeys.length,
        progress: userKeys.length,
      };
    });
  });
};

export const updateQuestParticipation = (
  user_id: string,
  quest_id: string,
  status: number
) => {
  return API.updateQuestParticipationUsersUserIdQuestParticipationsQuestIdPut(
    user_id,
    quest_id,
    {
      status: status,
    }
  );
};

export const fetchUnstartedQuests = (eventID: string, userID: string) => {
  if (userID == null || eventID == null) {
    return [];
  }
  return API.readUserQuestParticipationsUsersUserIdQuestParticipationsGet(
    userID,
    eventID,
    QuestStatus._2
  );
};
