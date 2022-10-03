import React from "react";
import { Button, Card, List } from "react-native-paper";

const MarkerCard = ({
  title,
  description,
  resetSelectedMarker,
}: {
  title: string | undefined;
  description: string | undefined;
  resetSelectedMarker: () => void;
}) => {
  return (
    <Card style={{ bottom: 0, position: "absolute", width: "100%" }}>
      <Card.Content>
        <List.Item
          title={title}
          description={description}
          right={() => (
            <Button
              onPress={() => {
                resetSelectedMarker();
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

export default MarkerCard;
