import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { getItemOwnerships } from "../api/items";
import { ItemOwnership, ItemType } from "../client";
import ErrorAlert from "../components/ErrorAlert";
import { currentUser } from "../recoil/atom";

const BagScreen = () => {
  const [user] = useRecoilState(currentUser);
  const { data, isLoading, isError } = useQuery<ItemOwnership[]>(
    ["item-ownerships", user?.id],
    () => (user ? getItemOwnerships(user.id) : []) //TODO: Better handling of null user
  );

  const DATA = [
    {
      title: "Keys",
      data: data
        ? data.filter(
            (itemOwnership) => itemOwnership.item.item_type === ItemType.KEY
          )
        : [],
    },
    {
      title: "Collectibles",
      data: data
        ? data.filter(
            (itemOwnership) =>
              itemOwnership.item.item_type === ItemType.COLLECTIBLE
          )
        : [],
    },
  ];

  const Item = ({
    title,
    description,
  }: {
    title: string;
    description: string | undefined;
  }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        {description ? description : "This is an item"}
      </Text>
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator animating={true} color={"purple"} />;
  }

  if (isError) {
    return <Text>Error getting items:(</Text>;
  }

  return (
    <View>
      <View style={styles.container}>
        {user ? (
          <SectionList
            renderSectionFooter={({ section }) =>
              section.data.length ? null : (
                <Text>You have no {section.title.toLowerCase()}</Text>
              )
            }
            sections={DATA}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({ item }) => (
              <Item
                title={item.item.title}
                description={item.item.description}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
        ) : (
          <ErrorAlert>Not logged in</ErrorAlert>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 6,
  },
  header: {
    fontSize: 16,
    color: "#696969",
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#696969",
  },
});

export default BagScreen;
