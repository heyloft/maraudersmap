import React, { useEffect } from "react";

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
import ProfileScreen from "./ProfileScreen";
import QuestNavigator from "./QuestNavigator";
import ScannerScreen from "./ScannerScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getOneEvent, getUserEventActiveQuests } from "../api/quests";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentEventState,
  currentUser,
  userQuestsState,
} from "../recoil/atom";
import { useQuery } from "react-query";
import { QuestParticipation } from "../client";
import { isRegisteredToEvent, registerUserToEvent } from "../api/events";

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

  const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);

  const setUserQuests = useSetRecoilState(userQuestsState);

  // TODO: Fetching first event for now, should be changed later
  useEffect(() => {
    getOneEvent().then((e) => {
      if (e) {
        setCurrentEvent(e);
        if (user) {
          isRegisteredToEvent(user.id, e.id).then((isRegistered) => {
            if (isRegistered) {
              return;
            }
            registerUserToEvent(user.id, e.id);
          });
        }
      }
    });
  }, []);

  const { data: userQuests } = useQuery<QuestParticipation[], Error>(
    ["userQuests", currentEvent],
    () =>
      user && currentEvent
        ? getUserEventActiveQuests(user.id, currentEvent.id)
        : []
  );

  // TODO: Would want to use onSuccess in useQuery instead, but it doesn't seem to be reactive enough
  useEffect(() => userQuests && setUserQuests(userQuests), [userQuests]);

  return (
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
  );
};

export default MainScreen;
