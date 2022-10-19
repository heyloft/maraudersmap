import genericPost from "./utils/generic-post";

const createItemOwnership = (inp: {
  obtainedAt: string;
  userId: string;
  itemID: string;
}) => {
  const data = {
    owner_id: inp.userId,
    item_id: inp.itemID,
    obtained_at: inp.obtainedAt,
  };
  return genericPost("itemOwnerships/", data);
};

export default createItemOwnership;
