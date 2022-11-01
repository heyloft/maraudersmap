import { atom, TransactionInterface_UNSTABLE } from "recoil";
import { LocationObject } from "expo-location";
import { User, Event, QuestParticipation, QuestItem } from "../client";

export const resetUserStateTransaction: (
  _: TransactionInterface_UNSTABLE
) => () => void =
  ({ reset }) =>
  () => {
    reset(currentLocationState);
    reset(isNewUserState);
    reset(currentUserState);
    reset(currentEventState);
    reset(activeQuestsState);
    reset(activeQuestItemsState);
    reset(completedQuestsState);
    reset(questsProgressState);
    reset(questsDirtyState);
    reset(questScreenVisibleQuestState);
  };

export const currentUserState = atom<User | null>({
  key: "currentUser",
  default: null,
});

export const isNewUserState = atom<boolean | null>({
  key: "isNewUser",
  default: null,
});

const defaultLocation: LocationObject = {
  timestamp: Date.now(),
  coords: {
    latitude: 63.43133846620186,
    longitude: 10.400746365666315,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    accuracy: null,
    speed: null,
  },
};

export const currentLocationState = atom({
  key: "currentLocation",
  default: defaultLocation,
});

export const currentEventState = atom<Event | null>({
  key: "currentEvent",
  default: null,
});

export type QuestParticipationProgress = {
  total: number;
  progress: number;
};

export const activeQuestsState = atom<QuestParticipation[] | null>({
  key: "activeQuests",
  default: null,
});

export const activeQuestItemsState = atom<QuestItem[] | null>({
  key: "activeQuestItems",
  default: null,
});

export const completedQuestsState = atom<QuestParticipation[] | null>({
  key: "userQuestsCompleted",
  default: null,
});

export const questsProgressState = atom<{
  [key: string]: QuestParticipationProgress;
} | null>({
  key: "userQuestsProgress",
  default: null,
});

export const questsDirtyState = atom<boolean>({
  key: "userQuestsDirty",
  default: false,
});

export const questScreenVisibleQuestState = atom<QuestParticipation | null>({
  key: "questScreenVisibleQuest",
  default: null,
});
