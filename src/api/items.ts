import { DefaultService as API } from "../client";

export const getItemOwnerships = (userID: string) => {
  return API.readItemOwnershipsUsersUserIdItemOwnershipsGet(userID);
};

export const createItemOwnership = (inp: {
  obtainedAt: string;
  userId: string;
  itemID: string;
}) => {
  return API.createItemOwnershipUsersUserIdItemOwnershipsPost(inp.userId, {
    item_id: inp.itemID,
    obtained_at: inp.obtainedAt,
  });
};
