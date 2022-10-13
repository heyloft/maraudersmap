import React from "react";
import { Button, Card, List } from "react-native-paper";

const ItemInfo = ({
  info,
  setItemId,
}: {
  info: string | undefined;
  setItemId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  console.log(info);

  return (
    <Card style={{ bottom: 0, position: "absolute", width: "100%" }}>
      <Card.Content>
        <List.Item
          title={info}
          description="Scan QR code at location to progress"
          right={() => (
            <Button
              onPress={() => {
                setItemId(null);
              }}
            >
              Close
            </Button>
          )}
        />
      </Card.Content>
    </Card>
  );
};

export default ItemInfo;
