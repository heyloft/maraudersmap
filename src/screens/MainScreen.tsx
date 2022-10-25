import React, { useEffect, useState } from "react";

import {
  faBriefcase,
  faCircleQuestion,
  faMap,
  faQrcode,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BagScreen from "./BagScreen";
import MapScreen from "./MapScreen";
import QuestNavigator from "./QuestNavigator";
import ScannerScreen from "./ScannerScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getUserEventQuests, updateQuestParticipation } from "../api/quests";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentEventState,
  currentUser,
  activeQuestsState,
  currentLocation,
} from "../recoil/atom";
import { useQuery } from "react-query";
import { QuestParticipation, QuestStatus } from "../client";
import {
  getOneEvent,
  isRegisteredToEvent,
  registerUserToEvent,
} from "../api/events";
import WelcomeModal from "../components/WelcomeModal";
import { Provider } from "react-native-paper";
import ProfileScreen from "./ProfileScreen";
import { questsWithinUnlockRadius } from "../location/locationUnlock";
import { locationSetup } from "../location/location";
import { sendNotification } from "../notifications/notifications";

export type RootStackParamList = {
  Map: undefined;
  Scanner: undefined;
  QuestNavigator: undefined;
  Bag: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const MainScreen = () => {
  const user = useRecoilValue(currentUser);
  const [location, setLocation] = useRecoilState(currentLocation);

  const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);
  const setActiveQuests = useSetRecoilState(activeQuestsState);

  // Simple "lock" to prevent multiple location unlocks for the same target
  // (which could cause things like multiple notifications)
  const [performingLocationUnlock, setPerformingLocationUnlock] =
    useState(false);

  const { data: activeQuests, refetch: refetchActiveQuests } = useQuery<
    QuestParticipation[],
    Error
  >(["activeQuests", currentEvent], () =>
    user && currentEvent
      ? getUserEventQuests(user.id, currentEvent.id, QuestStatus.ACTIVE)
      : []
  );

  // TODO: Would want to use onSuccess in useQuery instead, but it doesn't seem to be reactive enough
  useEffect(
    () => activeQuests && setActiveQuests(activeQuests),
    [activeQuests]
  );

  const { data: unstartedQuests, refetch: refetchUnstartedQuests } = useQuery<
    QuestParticipation[],
    Error
  >(["unstartedQuests", user, currentEvent], () => {
    if (user && currentEvent) {
      return getUserEventQuests(
        user.id,
        currentEvent.id,
        QuestStatus.UNSTARTED
      );
    }
    return unstartedQuests;
  });

  // TODO: Fetching first event for now, should be changed later
  useEffect(() => {
    getOneEvent().then((evnt) => {
      if (evnt && user) {
        isRegisteredToEvent(user.id, evnt.id)
          .then((isRegistered) => {
            if (!isRegistered) {
              return registerUserToEvent(user.id, evnt.id);
            }
          })
          .then(() => setCurrentEvent(evnt));
      }
    });
  }, []);

  useEffect(() => {
    // Caution! State variables will be outdated when accessed from the location update callback,
    // since they where frozen when the callback subscription was created (in `locationSetup`).
    // This is why we only update the state, and use a seperate useEffect to react to the change
    locationSetup(setLocation);
  }, []);

  useEffect(() => {
    if (unstartedQuests && user && currentEvent && !performingLocationUnlock) {
      setPerformingLocationUnlock(true);
      const unlockedQuests = questsWithinUnlockRadius(
        location.coords,
        unstartedQuests.map((qp) => qp.quest)
      );
      if (unlockedQuests.length == 0) {
        setPerformingLocationUnlock(false);
        return;
      }
      Promise.all(
        unlockedQuests.map((quest) => {
          sendNotification(
            "Quest Unlocked ✨",
            `You unlocked '${quest.title}'`
          );
          return updateQuestParticipation(
            user.id,
            quest.id,
            QuestStatus.ACTIVE
          );
        })
      )
        .then(() =>
          getUserEventQuests(user.id, currentEvent.id, QuestStatus.ACTIVE)
        )
        .then(setActiveQuests)
        .then(() => refetchUnstartedQuests())
        .then(() => refetchActiveQuests())
        .then(() => setPerformingLocationUnlock(false));
    }
  }, [location, unstartedQuests]);

  return (
    <Provider>
      <WelcomeModal />
      <Tab.Navigator>
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: "Map",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faMap} color={color} size={size} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="QuestNavigator"
          component={QuestNavigator}
          options={{
            title: "Quests",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon
                icon={faCircleQuestion}
                color={color}
                size={size}
              />
            ),
            headerShown: false,
            // tabBarBadge: 3,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{
            title: "Scanner",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faQrcode} color={color} size={size} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Bag"
          component={BagScreen}
          options={{
            title: "Bag",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faBriefcase} color={color} size={size} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faUser} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </Provider>
  );
};

export default MainScreen;
