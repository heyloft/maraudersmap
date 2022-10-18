import genericPost from "./generic-post";

const createUser = (username: string) => {
  const data = { username: username };
  return genericPost("user/", data);
};

export default createUser;
