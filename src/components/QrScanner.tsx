import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import QuestCompletedModal from "./QuestCompletedModal";

export default function QrScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [hasCompletedQuest, setQuestCompleted] = useState<boolean>(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    setQuestCompleted(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <>
          <ActivityIndicator size={"large"} color="#1E88E5" />
          <Text style={{ marginTop: 20 }}>Requesting camera permission</Text>
        </>
      ) : !hasPermission ? (
        <Text>No access to camera</Text>
      ) : (
        <>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <View style={{ marginTop: 200, backgroundColor: "white" }}>
              <Button
                title={"Tap to scan again"}
                onPress={() => setScanned(false)}
              />
            </View>
          )}
          {hasCompletedQuest && (
            <View>
              <QuestCompletedModal />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
