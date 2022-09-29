import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../../App";
import Map from "../components/Map";

const MapScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Map">) => {
  return <Map />;
};

export default MapScreen;
