import genericFetch from "./utils/generic-fetch";
import genericPost from "./utils/generic-post";

export const registerUserToEvent = (userId: string, eventId: string) => {
  return genericPost("eventParticipations/", {
    status: 0,
    event_id: eventId,
    user_id: userId,
  });
};

export const isRegisteredToEvent = (userId: string, eventId: string) => {
  return genericFetch(`eventParticipations/${userId}/${eventId}/`)
    .then((ep) => ep != null && ep.event.id == eventId && ep.user.id == userId)
    .catch(() => false);
};
