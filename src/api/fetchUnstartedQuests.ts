import genericFetch from "./utils/generic-fetch";

const fetchUnstartedQuests = (eventID: string, userID: string) => {
  if (userID == null || eventID == null) {
    return [];
  }
  return genericFetch(`events/${eventID}/user/${userID}/unstartedQuests/`);
};

export default fetchUnstartedQuests;
