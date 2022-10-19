import { BASE_URL } from "@env";
import axios from "axios";

const genericPut = async (endpoint: string, data: object) => {
  //TODO: Replace data type
  return axios.put(BASE_URL + endpoint, data);
};

export default genericPut;
