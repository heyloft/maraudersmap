import React from "react";
import { Provider } from "react-native-paper";
import InduvidualQuest, { QuestItem } from "../components/InduvidualQuest";
import AbandonQuestDialog from "../components/AbandonQuestDialog";
import { useState } from "react";

// Some hardcoded questitems. Can be used for testing.
// eslint-disable-next-line
const hiddenKey: QuestItem = {
  title: "Hidden Key",
  description: "To enter you have to find the hidden key.",
  steps: [
    ["Defeat cave troll", true],
    ["Win quidditch match", true],
    ["kajfk", false],
  ],
};
// eslint-disable-next-line
const questItem2: QuestItem = {
  title: "Quest Item 2",
  description: "To enter you have to find the hidden key.",
  steps: [
    ["Defeat cave troll", true],
    ["Win quidditch match", false],
  ],
};
// eslint-disable-next-line
const questItem3: QuestItem = {
  title: "Quest Item 3",
  description: "To enter you have to find the hidden key.",
  steps: [
    ["Defeat cave troll", false],
    ["Win quidditch match", false],
  ],
};

const QuestScreen = () => {
  const [showAbandonDialog, setShowAbandonDialog] = useState<boolean>(false);
  return (
    <Provider>
      <AbandonQuestDialog
        visible={showAbandonDialog}
        setVisible={setShowAbandonDialog}
      />
      <InduvidualQuest
        showDialog={() => setShowAbandonDialog(true)}
        title="Gathering of Easter Eggs"
        description="This is a colourful description of the Gathering of Easter Eggs quest. This is
        a colourful description of the Gathering of Easter Eggs quest. This is a colourful 
        description of the Gathering of Easter Eggs quest."
        date={new Date()}
        possibleRewards={[
          "Ancient T-Shirt of Disillusionment",
          "Vessel of RottenGlory",
        ]}
        questItems={[hiddenKey, questItem2, questItem3]}
      ></InduvidualQuest>
    </Provider>
  );
};

export default QuestScreen;
