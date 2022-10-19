import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useRecoilState } from "recoil";
import { currentUser } from "../recoil/atom";
import LogInScreen from "./LogInScreen";
import MainScreen from "./MainScreen";

const Stack = createNativeStackNavigator();
const AppScreen = () => {
  const [user] = useRecoilState(currentUser);

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
