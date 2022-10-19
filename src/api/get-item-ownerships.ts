import genericFetch from "./utils/generic-fetch";

const getItemOwnerships = () => {
  return genericFetch("itemOwnerships/");
};

export default getItemOwnerships;
