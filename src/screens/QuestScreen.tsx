import React from "react";
import { Provider } from "react-native-paper";
import QuestDetails from "../components/QuestDetails";
import AbandonQuestDialog from "../components/AbandonQuestDialog";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import {
  questScreenVisibleQuestState,
  userQuestsProgressState,
} from "../recoil/atom";

const QuestScreen = () => {
  const [showAbandonDialog, setShowAbandonDialog] = useState<boolean>(false);
  const questScreenVisibleQuest = useRecoilValue(questScreenVisibleQuestState);
  const userQuestsProgress = useRecoilValue(userQuestsProgressState);

  return (
    questScreenVisibleQuest && (
      <Provider>
        <AbandonQuestDialog
          visible={showAbandonDialog}
          setVisible={setShowAbandonDialog}
        />
        <QuestDetails
          showDialog={() => setShowAbandonDialog(true)}
          questParticipation={questScreenVisibleQuest}
          questProgress={
            userQuestsProgress
              ? userQuestsProgress[questScreenVisibleQuest.quest.id]
              : null
          }
        ></QuestDetails>
      </Provider>
    )
  );
};

export default QuestScreen;
