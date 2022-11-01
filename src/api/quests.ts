import {
  DefaultService as API,
  ItemOwnership,
  ItemType,
  QuestItem,
  QuestParticipation,
  QuestStatus,
} from "../client";
import { getItemOwnerships } from "./items";

export const getUserEventQuests = (
  user_id: string,
  event_id: string,
  status?: QuestStatus
): Promise<QuestParticipation[]> => {
  return API.readUserQuestParticipations(user_id, event_id, status);
};

export const getQuestItems = (quest_id: string) => API.readQuestItems(quest_id);

export const getUserQuestProgress = (
  user_id: string,
  quest_id: string
): Promise<{ total: number; progress: number }> => {
  return getQuestItems(quest_id).then((questItems: QuestItem[]) => {
    const questKeys = questItems.filter(
      (qi) => qi.item.item_type == ItemType.KEY
    );
    return getItemOwnerships(user_id).then((userItems: ItemOwnership[]) => {
      // TODO: Check which quest item is from
      const userKeys = userItems.filter(
        (ui) => ui.quest_item.item.item_type == ItemType.KEY
      );
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
  status: QuestStatus
) => {
  return API.updateQuestParticipation(user_id, quest_id, {
    status: status,
  });
};
