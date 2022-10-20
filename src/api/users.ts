import genericFetch from "./utils/generic-fetch";
import genericPost from "./utils/generic-post";

export const getUser = (username: string) => {
  return genericFetch("users/by_username/" + username);
};

export const createUser = (username: string) => {
  return genericPost("users/", {
    username: username,
  });
};
