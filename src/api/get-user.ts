import genericFetch from "./utils/generic-fetch";

const getUser = (username: string) => {
  return genericFetch("user/" + username);
};

export default getUser;
