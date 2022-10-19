import genericPost from "./generic-post";

const createUser = (username: string) => {
  const data = { username: username };
  return genericPost("users/", data);
};

export default createUser;
