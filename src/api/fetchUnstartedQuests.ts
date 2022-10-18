import genericFetch from "./utils/generic-fetch";

const fetchUnstartedQuests = (eventID: string, userID: string) => {
  return genericFetch(`/event/${eventID}/user/${userID}/unstartedQuests/`);
};

export default fetchUnstartedQuests;
