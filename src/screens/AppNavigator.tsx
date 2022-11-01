import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atom";
import LogInScreen from "./LogInScreen";
import MainScreen from "./MainScreen";

const Stack = createNativeStackNavigator();
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
          <Stack.Screen name="Login" component={LogInScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppScreen;
