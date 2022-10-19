import genericFetch from "./utils/generic-fetch";

const getUser = (username: string) => {
  return genericFetch("users/by_username/" + username);
};

export default getUser;
