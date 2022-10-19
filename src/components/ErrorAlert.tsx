import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text } from "react-native";
import { Surface } from "react-native-paper";

const ErrorAlert = ({ children }: { children: string }) => {
  return (
    <Surface
      style={{
        padding: 22,
        backgroundColor: "red",
        borderRadius: 4,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          color={"white"}
          size={32}
        />
        <View style={{ marginStart: 20 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>ERROR</Text>
          <Text style={{ color: "white", fontSize: 16 }}>{children}</Text>
        </View>
      </View>
    </Surface>
  );
};

export default ErrorAlert;
