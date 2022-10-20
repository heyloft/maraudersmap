import { DefaultService as API } from "../client";

export const getUser = (username: string) => {
  return API.readUserByUsernameUsersByUsernameUsernameGet(username);
};

export const createUser = (username: string) => {
  return API.createUserUsersPost({
    username: username,
  });
};
