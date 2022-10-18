import { BASE_URL } from "@env";
import axios from "axios";

const genericFetch = async (endpoint: string) => {
  return await (
    await axios.get(BASE_URL + endpoint)
  ).data;
};

export default genericFetch;
