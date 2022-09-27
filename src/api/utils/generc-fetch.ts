// @ts-ignore
import { BASE_URL } from "@env";

const genericFetch = async (endpoint: string) => {
  const res = await fetch(BASE_URL + endpoint);
  return res.json();
};

export default genericFetch;
