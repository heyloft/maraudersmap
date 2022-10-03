import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuestLogScreen from "./QuestLogScreen";
import QuestScreen from "./QuestScreen";

export type QuestStackParamList = {
  QuestLog: undefined;
  Quest: undefined;
};

const Stack = createNativeStackNavigator();

const QuestNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="QuestLog" component={QuestLogScreen}></Stack.Screen>
      <Stack.Screen name="Quest" component={QuestScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default QuestNavigator;
