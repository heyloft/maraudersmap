import genericFetch from "./utils/generic-fetch";

const getItemOwnerships = (userID: string) => {
  return genericFetch("itemOwnerships/" + userID);
};

export default getItemOwnerships;
