import { DefaultService as API } from "../client";

export const getItemOwnerships = (userID: string) =>
  API.readItemOwnerships(userID);

export const createItemOwnership = (args: {
  obtainedAt: string;
  userId: string;
  questItemID: string;
}) => {
  return API.createItemOwnership(args.userId, {
    quest_item_id: args.questItemID,
    obtained_at: args.obtainedAt,
  });
};
