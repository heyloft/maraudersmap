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
import QuestNavigator from "./QuestNavigator";
import ScannerScreen from "./ScannerScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getUserEventQuests } from "../api/quests";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentEventState,
  currentUser,
  activeQuestsState,
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

  const setActiveQuests = useSetRecoilState(activeQuestsState);

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

  const { data: userQuests } = useQuery<QuestParticipation[], Error>(
    ["userQuests", currentEvent],
    () =>
      user && currentEvent
        ? getUserEventQuests(user.id, currentEvent.id, QuestStatus.ACTIVE)
        : []
  );

  // TODO: Would want to use onSuccess in useQuery instead, but it doesn't seem to be reactive enough
  useEffect(() => userQuests && setActiveQuests(userQuests), [userQuests]);

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
