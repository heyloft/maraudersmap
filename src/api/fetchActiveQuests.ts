import genericFetch from "./utils/generic-fetch";

const fetchActiveQuests = (eventID: string, userID: string) => {
  return genericFetch(`events/${eventID}/user/${userID}/activeQuests/`);
};

export default fetchActiveQuests;
