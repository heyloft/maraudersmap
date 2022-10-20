import { DefaultService as API } from "../client";

export const getOneEvent = () => API.readEvents().then((events) => events[0]);

export const registerUserToEvent = (userId: string, eventId: string) => {
  return API.createEventParticipation(userId, {
    status: 0,
    event_id: eventId,
  });
};

export const isRegisteredToEvent = (userId: string, eventId: string) => {
  return API.readEventParticipation(userId, eventId)
    .then((ep) => ep != null && ep.event.id == eventId && ep.user.id == userId)
    .catch(() => false);
};
