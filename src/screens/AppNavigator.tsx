import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atom";
import LogInScreen from "./LogInScreen";
import MainScreen from "./MainScreen";

export type AppStackParamList = {
  Main: undefined;
  Signup: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppScreen = () => {
  const user = useRecoilValue(currentUserState);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Main"
            component={MainScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Signup" component={LogInScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppScreen;
