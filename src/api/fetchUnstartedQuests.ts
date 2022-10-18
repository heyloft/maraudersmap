import genericFetch from "./utils/generic-fetch";

const fetchUnstartedQuests = (eventID: string, userID: string) => {
  return genericFetch(`events/${eventID}/user/${userID}/unstartedQuests/`);
};

export default fetchUnstartedQuests;
