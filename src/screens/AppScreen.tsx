import {
  faBriefcase,
  faCircleQuestion,
  faMap,
  faQrcode,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useRecoilState } from "recoil";
import { currentUserInfo } from "../recoil/atom";
import BagScreen from "./BagScreen";
import LogInScreen from "./LogInScreen";
import MapScreen from "./MapScreen";
import ProfileScreen from "./ProfileScreen";
import QuestNavigator from "./QuestNavigator";
import ScannerScreen from "./ScannerScreen";

export type RootStackParamList = {
  Map: undefined;
  Scanner: undefined;
  QuestNavigator: undefined;
  Bag: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const AppScreen = () => {
  const [user] = useRecoilState(currentUserInfo);

  return !user.username ? (
    <LogInScreen />
  ) : (
    <Tab.Navigator>
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Map",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faMap} color={color} size={size} />
          ),
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
          tabBarBadge: 3,
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

export default AppScreen;
