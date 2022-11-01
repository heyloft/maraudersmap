import { DefaultService as API } from "../client";

export const getUser = (username: string) => API.readUserByUsername(username);

export const createUser = (username: string) =>
  API.createUser({
    username: username,
  });
