import { Dialog, Portal, Button, Paragraph } from "react-native-paper";
import { View } from "react-native";

interface deleteQuestDialogProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AbandonQuestDialog = (props: deleteQuestDialogProps) => {
  const onDeleteQuest = () => {
    props.setVisible(false);
  };

  return (
    <View>
      <Portal>
        <Dialog
          visible={props.visible}
          onDismiss={() => props.setVisible(false)}
        >
          <Dialog.Title>Abandon Quest</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              You are trapped in the realm of the dead, you cannot leave without
              the key.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "space-between" }}>
            <Button mode="outlined" onPress={() => props.setVisible(false)}>
              Cancel
            </Button>
            <Button mode="outlined" color="red" onPress={onDeleteQuest}>
              Abandon
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default AbandonQuestDialog;
