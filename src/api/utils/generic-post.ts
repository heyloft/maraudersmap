import { BASE_URL } from "@env";

const genericPost = async (endpoint: string, data: object) => {
  //TODO: Replace data type
  const response = await fetch(BASE_URL + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export default genericPost;
