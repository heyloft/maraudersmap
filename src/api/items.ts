import { DefaultService as API } from "../client";

export const getItemOwnerships = (userID: string) =>
  API.readItemOwnerships(userID);

export const createItemOwnership = (inp: {
  obtainedAt: string;
  userId: string;
  questItemID: string;
}) => {
  return API.createItemOwnership(inp.userId, {
    quest_item_id: inp.questItemID,
    obtained_at: inp.obtainedAt,
  });
};
