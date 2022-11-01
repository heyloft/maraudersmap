import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Provider } from "react-native-paper";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState, questsDirtyState } from "../recoil/atom";
import { useMutation } from "react-query";
import { sendNotification } from "../notifications/notifications";
import { createItemOwnership, getItemOwnerships } from "../api/items";

export default function QrScanner() {
  const [hasScannerPermissions, setHasScannerPermissions] = useState<
    boolean | null
  >(null);
  const [scanned, setScanned] = useState<boolean>(false);

  const user = useRecoilValue(currentUserState);
  const userQuestsDirty = useSetRecoilState(questsDirtyState);

  useEffect(() => {
    BarCodeScanner.requestPermissionsAsync().then(({ status }) => {
      setHasScannerPermissions(status === "granted");
    });
  }, []);

  const { mutate: itemOwnershipMutation } = useMutation(createItemOwnership, {
    onSuccess: (ownership) => {
      sendNotification(
        "Item Unlocked 🥳",
        `You have unlocked '${ownership.quest_item.item.title}'`
      );
      userQuestsDirty(true);
    },
    onError: () => {
      Alert.alert("😐️ Oops ", "Something went wrong...");
    },
  });

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    if (user) {
      getItemOwnerships(user.id).then((ownerships) => {
        if (ownerships.map((o) => o.quest_item.item.id).includes(data)) {
          Alert.alert(
            "🎒 Already unlocked",
            "You already have this item in your bag"
          );
          return;
        }
        itemOwnershipMutation({
          obtainedAt: new Date().toISOString(),
          userId: user.id,
          questItemID: data,
        });
      });
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        {hasScannerPermissions === null ? (
          <>
            <ActivityIndicator size={"large"} color="#1E88E5" />
            <Text style={{ marginTop: 20 }}>Requesting camera permission</Text>
          </>
        ) : !hasScannerPermissions ? (
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
