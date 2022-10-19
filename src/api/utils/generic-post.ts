import { BASE_URL } from "@env";
import axios from "axios";

const genericPost = async (endpoint: string, data: object) => {
  //TODO: Replace data type

  return axios.post(BASE_URL + endpoint, data);
};

export default genericPost;
