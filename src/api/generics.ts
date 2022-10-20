import { BASE_URL } from "@env";
import axios from "axios";

export const genericFetch = async (endpoint: string) => {
  return await (
    await axios.get(BASE_URL + endpoint)
  ).data;
};

export const genericPost = async (endpoint: string, data: object) => {
  return axios.post(BASE_URL + endpoint, data);
};

export const genericPut = async (endpoint: string, data: object) => {
  return axios.put(BASE_URL + endpoint, data);
};
