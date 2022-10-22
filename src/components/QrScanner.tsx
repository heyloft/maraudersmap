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
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentUser,
  userQuestsProgressState,
  userQuestsState,
} from "../recoil/atom";
import { useMutation } from "react-query";
import { Quest } from "../client";
import { getUserQuestProgress } from "../api/quests";
import { sendNotification } from "../notifications/notifications";
import { createItemOwnership } from "../api/items";

export default function QrScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const user = useRecoilValue(currentUser);
  const userQuests = useRecoilValue(userQuestsState);

  const [completedQuest, setCompletedQuest] = useState<Quest | null>(null);

  const [userQuestsProgress, setUserQuestsProgress] = useRecoilState(
    userQuestsProgressState
  );
  const { mutate: itemOwnershipMutation } = useMutation(createItemOwnership, {
    onSuccess: (ownership) => {
      sendNotification(
        "Item Unlocked 🥳",
        `You have unlocked '${ownership.item.title}'`
      );
      if (user && userQuests) {
        userQuests.forEach((q) => {
          getUserQuestProgress(user.id, q.quest.id).then((p) => {
            setUserQuestsProgress((existing) => ({
              ...existing,
              [q.quest.id]: p,
            }));
          });
        });
      }
    },
    onError: () => {
      alert("Oops! Something went wrong");
    },
  });

  useEffect(() => {
    if (userQuestsProgress) {
      for (const [questId, p] of Object.entries(userQuestsProgress)) {
        if (p.progress >= p.total && p.total > 0) {
          const quest = userQuests?.find((q) => q.quest.id == questId)?.quest;
          if (quest) {
            setCompletedQuest(quest);
          }
        }
      }
    }
  }, [userQuestsProgress]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: { type: string; data: string }) => {
    setScanned(true);
    if (user) {
      itemOwnershipMutation({
        obtainedAt: new Date().toISOString(),
        userId: user.id,
        itemID: data,
      });
    }
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
            {completedQuest && (
              <QuestCompletedModal
                quest={completedQuest}
                onDismiss={() => setCompletedQuest(null)}
              />
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
