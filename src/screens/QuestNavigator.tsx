import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuestLogScreen from "./QuestLogScreen";
import QuestScreen from "./QuestScreen";

export type QuestStackParamList = {
  "Quest log": undefined;
  Quest: undefined;
};

const Stack = createNativeStackNavigator<QuestStackParamList>();

const QuestNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Quest log" component={QuestLogScreen}></Stack.Screen>
      <Stack.Screen name="Quest" component={QuestScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default QuestNavigator;
