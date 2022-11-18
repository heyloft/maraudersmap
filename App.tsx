import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { notificationSetup } from "./src/notifications/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import AppNavigator from "./src/screens/AppNavigator";
import { OpenAPI } from "./src/client";
import { BASE_URL } from "@env";
import { Alert } from "react-native";

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    // Specify backend url to be used in API client
    OpenAPI.BASE = BASE_URL;
    notificationSetup().then((error) => {
      if (error) {
        Alert.alert("Notification error", error);
      }
    });
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
