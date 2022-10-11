import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { notificationSetup } from "./src/notifications/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import AppNavigator from "./src/screens/AppNavigator";

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    notificationSetup();
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
