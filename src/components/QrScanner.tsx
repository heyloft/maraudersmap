import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Provider, Button as PaperButton } from "react-native-paper";
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
  const setUserQuestsDirty = useSetRecoilState(questsDirtyState);

  useEffect(() => {
    BarCodeScanner.requestPermissionsAsync().then(({ status }) => {
      setHasScannerPermissions(status === "granted");
    });
  }, []);

  const enumToReadableName = (s: string) =>
    s.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase());

  const { mutate: itemOwnershipMutation } = useMutation(createItemOwnership, {
    onSuccess: (ownership) => {
      sendNotification(
        `${enumToReadableName(
          ownership.quest_item.item.item_type
        )} Unlocked 🥳`,
        `You have unlocked '${ownership.quest_item.item.title}'`
      );
      // Mark user quests list as "dirty" to force a refetch
      setUserQuestsDirty(true);
    },
    onError: () => {
      Alert.alert("😐️ Oops ", "Something went wrong...");
    },
  });

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    if (user) {
      getItemOwnerships(user.id).then((ownerships) => {
        if (ownerships.map((o) => o.quest_item.id).includes(data)) {
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
                {/* Using button from react-native-paper to get background color on iOS */}
                <PaperButton
                  icon="reload"
                  mode="contained"
                  color="#1E88E5"
                  onPress={() => setScanned(false)}
                >
                  Scan again
                </PaperButton>
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
