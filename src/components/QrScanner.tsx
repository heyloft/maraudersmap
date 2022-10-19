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
import { Provider } from "react-native-paper";
import { useRecoilState } from "recoil";
import { currentUser } from "../recoil/atom";
import { useMutation } from "react-query";
import createItemOwnership from "../api/create-item-ownership";

export default function QrScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [hasCompletedQuest, setQuestCompleted] = useState<boolean>(false);
  const [user] = useRecoilState(currentUser);
  const { mutate: itemOwnershipMutation } = useMutation(createItemOwnership, {
    onSuccess: ({ data: ownership }) => {
      alert(`You have unlocked ${ownership.item.title}🥳`);
    },
    onError: () => {
      alert("Opps! Something went wrong");
    },
  });

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: { type: string; data: string }) => {
    setScanned(true);
    setQuestCompleted(true);
    if (user)
      itemOwnershipMutation({
        obtainedAt: new Date().toISOString(),
        userId: user.id,
        itemID: data,
      });
  };

  return (
    <Provider>
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
              <View style={{ marginTop: 550 }}>
                <Button
                  title={"Tap to scan again"}
                  onPress={() => setScanned(false)}
                />
              </View>
            )}
            {hasCompletedQuest && <QuestCompletedModal />}
          </>
        )}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
