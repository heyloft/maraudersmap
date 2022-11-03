import React, { useEffect, useState } from "react";
import {
  faBriefcase,
  faCircleQuestion,
  faMap,
  faQrcode,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BagScreen from "./BagScreen";
import MapScreen from "./MapScreen";
import QuestNavigator from "./QuestNavigator";
import ScannerScreen from "./ScannerScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  getQuestItems,
  getUserEventQuests,
  updateQuestParticipation,
} from "../api/quests";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentEventState,
  currentUserState,
  activeQuestsState,
  currentLocationState,
  questsDirtyState,
  completedQuestsState,
  isNewUserState,
  activeQuestItemsState,
} from "../recoil/atom";
import { useQuery } from "react-query";
import { QuestItem, QuestParticipation, QuestStatus } from "../client";
import {
  getOneEvent,
  isRegisteredToEvent,
  registerUserToEvent,
} from "../api/events";
import WelcomeModal from "../components/WelcomeModal";
import { Provider } from "react-native-paper";
import ProfileScreen from "./ProfileScreen";
import { questsWithinUnlockRadius } from "../location/locationUnlock";
import { locationSetup } from "../location/location";
import { sendNotification } from "../notifications/notifications";
import QuestCompletedModal from "../components/QuestCompletedModal";
import { Alert } from "react-native";
import { AppStackParamList } from "./AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";

export type TabStackParamList = {
  Map: undefined;
  Scanner: undefined;
  QuestNavigator: undefined;
  Bag: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const MainScreen = ({
  navigation,
}: CompositeScreenProps<
  NativeStackScreenProps<AppStackParamList, "Main">,
  NativeStackScreenProps<TabStackParamList>
>) => {
  const user = useRecoilValue(currentUserState);
  const isNewUser = useRecoilValue(isNewUserState);
  const [location, setLocation] = useRecoilState(currentLocationState);

  const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);
  const [userQuestsDirty, setUserQuestsDirty] =
    useRecoilState(questsDirtyState);
  const [activeQuests, setActiveQuests] = useRecoilState(activeQuestsState);
  const setQuestItems = useSetRecoilState(activeQuestItemsState);

  // Need some concept of quests that have very recently been completed in order to show the completion modal
  const [completedQuests, setCompletedQuests] =
    useRecoilState(completedQuestsState);
  const [newlyCompletedQuests, setNewlyCompletedQuests] = useState<
    QuestParticipation[] | null
  >(null);

  // Simple "lock" to prevent multiple location unlocks for the same target
  // (which could cause things like multiple notifications)
  const [performingLocationUnlock, setPerformingLocationUnlock] =
    useState(false);

  const { refetch: refetchActiveQuests } = useQuery<
    QuestParticipation[],
    Error
  >(
    ["activeQuests", currentEvent],
    () =>
      user && currentEvent
        ? getUserEventQuests(user.id, currentEvent.id, QuestStatus.ACTIVE)
        : [],
    {
      onSuccess: setActiveQuests,
    }
  );

  useQuery<QuestItem[] | null, Error>(
    ["questItems", activeQuests],
    async () => {
      return activeQuests == null
        ? null
        : (
            await Promise.all(
              activeQuests.map((q) => getQuestItems(q.quest.id))
            )
          ).flat();
    },
    {
      onSuccess: setQuestItems,
    }
  );

  const { refetch: refetchCompletedQuests } = useQuery<
    QuestParticipation[] | null,
    Error
  >(
    ["completedQuests", currentEvent],
    () =>
      user && currentEvent
        ? getUserEventQuests(user.id, currentEvent.id, QuestStatus.FINISHED)
        : null,
    {
      onSuccess: (data) => {
        if (data) {
          // Only recognize as new if alreadyCompletedQuests have been loaded at least once
          // (to avoid recognizing completions from previous sessions as new)
          if (completedQuests != null) {
            // Compare with previous list of completed quests to find recent completions
            const newCompletions = data.filter(
              (q) => !completedQuests?.includes(q)
            );
            setNewlyCompletedQuests((v) => [...(v ?? []), ...newCompletions]);
          }
          setCompletedQuests(data);
        }
      },
    }
  );

  const { data: unstartedQuests, refetch: refetchUnstartedQuests } = useQuery<
    QuestParticipation[],
    Error
  >(["unstartedQuests", user, currentEvent], () => {
    if (user && currentEvent) {
      return getUserEventQuests(
        user.id,
        currentEvent.id,
        QuestStatus.UNSTARTED
      );
    }
    return unstartedQuests;
  });

  // TODO: Fetching first event for now, should be changed later
  useEffect(() => {
    getOneEvent().then((evnt) => {
      if (evnt && user) {
        isRegisteredToEvent(user.id, evnt.id)
          .then((isRegistered) => {
            if (!isRegistered) {
              return registerUserToEvent(user.id, evnt.id);
            }
          })
          .then(() => setCurrentEvent(evnt));
      }
    });
  }, []);

  useEffect(() => {
    // Caution! State variables will be outdated when accessed from the location update callback,
    // since they where frozen when the callback subscription was created (in `locationSetup`).
    // This is why we only update the state, and use a seperate useEffect to react to the change
    if (!locationSetup(setLocation)) {
      Alert.alert(
        "Permission required",
        "This app wont work as intended without LocationPermissions"
      );
    }
  }, []);

  useEffect(() => {
    if (unstartedQuests && user && currentEvent && !performingLocationUnlock) {
      setPerformingLocationUnlock(true);
      const unlockedQuests = questsWithinUnlockRadius(
        location.coords,
        unstartedQuests.map((qp) => qp.quest)
      );
      if (unlockedQuests.length == 0) {
        setPerformingLocationUnlock(false);
        return;
      }
      Promise.all(
        unlockedQuests.map((quest) => {
          sendNotification(
            "Quest Unlocked ✨",
            `You unlocked '${quest.title}'`
          );
          return updateQuestParticipation(
            user.id,
            quest.id,
            QuestStatus.ACTIVE
          );
        })
      )
        .then(() =>
          getUserEventQuests(user.id, currentEvent.id, QuestStatus.ACTIVE)
        )
        .then(setActiveQuests)
        .then(() => refetchUnstartedQuests())
        .then(() => refetchActiveQuests())
        .then(() => setPerformingLocationUnlock(false));
    }
  }, [location, unstartedQuests]);

  useEffect(() => {
    if (userQuestsDirty) {
      setUserQuestsDirty(false);
      refetchActiveQuests();
      refetchCompletedQuests();
    }
  }, [userQuestsDirty]);

  const dismissCompletedQuest = (q: QuestParticipation) => {
    setNewlyCompletedQuests(
      (completedQuests) =>
        completedQuests?.filter((c) => c.quest.id !== q.quest.id) ?? null
    );
  };

  return (
    <Provider>
      <>
        {isNewUser && <WelcomeModal />}
        {newlyCompletedQuests &&
          newlyCompletedQuests.length > 0 &&
          ((q) => (
            <QuestCompletedModal
              key={q.quest.id}
              quest={q.quest}
              onDismiss={() => dismissCompletedQuest(q)}
              onNavigateToBag={() => {
                dismissCompletedQuest(q);
                navigation.navigate("Bag");
              }}
            />
          ))(newlyCompletedQuests[0])}
      </>
      <Tab.Navigator>
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: "Map",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faMap} color={color} size={size} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="QuestNavigator"
          component={QuestNavigator}
          options={{
            title: "Quests",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon
                icon={faCircleQuestion}
                color={color}
                size={size}
              />
            ),
            headerShown: false,
            // tabBarBadge: 3,
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{
            title: "Scanner",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faQrcode} color={color} size={size} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Bag"
          component={BagScreen}
          options={{
            title: "Bag",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faBriefcase} color={color} size={size} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faUser} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </Provider>
  );
};

export default MainScreen;
