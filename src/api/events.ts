import { DefaultService as API, Event } from "../client";

export const getAllEvents = (): Promise<Event[]> => {
  return API.readEventsEventsGet();
};

export const getOneEvent = () => getAllEvents().then((events) => events[0]);

export const registerUserToEvent = (userId: string, eventId: string) => {
  return API.createEventParticipationUsersUserIdEventParticipationsPost(
    userId,
    {
      status: 0,
      event_id: eventId,
    }
  );
};

export const isRegisteredToEvent = (userId: string, eventId: string) => {
  return API.readEventParticipationUsersUserIdEventParticipationsEventIdGet(
    userId,
    eventId
  )
    .then((ep) => ep != null && ep.event.id == eventId && ep.user.id == userId)
    .catch(() => false);
};
