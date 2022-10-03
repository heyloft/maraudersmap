import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import BagScreen from "./src/screens/BagScreen";
import MapScreen from "./src/screens/MapScreen";
import QuestLogScreen from "./src/screens/QuestLogScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons/faMap";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons/faCircleQuestion";
import { faQrcode } from "@fortawesome/free-solid-svg-icons/faQrcode";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons/faBriefcase";
import ScannerScreen from "./src/screens/ScannerScreen";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { notificationSetup } from "./src/notifications/notifications";
import { QueryClient, QueryClientProvider } from "react-query";

const Tab = createBottomTabNavigator<RootStackParamList>();
export type RootStackParamList = {
  Map: undefined;
  Scanner: undefined;
  QuestLog: undefined;
  Bag: undefined;
};

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    notificationSetup();
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
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
              name="QuestLog"
              component={QuestLogScreen}
              options={{
                title: "Quests",
                tabBarIcon: ({ color, size }) => (
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    color={color}
                    size={size}
                  />
                ),
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
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
