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
import getItemOwnerships from "../api/get-item-ownerships";
import { ItemOwnership } from "../client";
import { currentUser } from "../recoil/atom";

const BagScreen = () => {
  const [user] = useRecoilState(currentUser);
  const { data, isLoading, isError } = useQuery<ItemOwnership[]>(
    ["item-ownerships", user?.id],
    () => getItemOwnerships(user ? user.id : "asd") //Very quick fix for potensial null value for user
  );

  const DATA = [
    {
      title: "Keys",
      data: data
        ? data.filter((itemOwnership) => itemOwnership.item.item_type === 2)
        : [],
    },
    {
      title: "Collectibles",
      data: data
        ? data.filter((itemOwnership) => itemOwnership.item.item_type === 1)
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
    <ActivityIndicator animating={true} color={"purple"} />;
  }

  if (isError) {
    <Text>Error getting items:(</Text>;
  }

  return (
    <View>
      <View style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => (
            <Item title={item.item.title} description={item.item.description} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
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
