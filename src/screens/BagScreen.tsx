import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { getItemOwnerships } from "../api/items";
import { ItemOwnership, ItemType } from "../client";
import ErrorAlert from "../components/ErrorAlert";
import ItemCard from "../components/ItemCard";
import { currentUserState } from "../recoil/atom";

const BagScreen = () => {
  const user = useRecoilValue(currentUserState);
  const { data, isLoading, isError } = useQuery<ItemOwnership[]>(
    ["item-ownerships", user?.id],
    () => (user ? getItemOwnerships(user.id) : []) //TODO: Better handling of null user
  );

  const DATA = [
    {
      title: "🎟️ Vouchers",
      data: data
        ? data.filter(
            (itemOwnership) =>
              itemOwnership.quest_item.item.item_type === ItemType.VOUCHER
          )
        : [],
    },
    {
      title: "🏺 Collectibles",
      data: data
        ? data.filter(
            (itemOwnership) =>
              itemOwnership.quest_item.item.item_type === ItemType.COLLECTIBLE
          )
        : [],
    },
  ].filter((s) => s.data.length > 0);

  if (isLoading) {
    return (
      <View style={{ marginTop: 32 }}>
        <ActivityIndicator size={"large"} color="#1E88E5" />
      </View>
    );
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
              <ItemCard
                title={item.quest_item.item.title}
                description={item.quest_item.item.description}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
            ListEmptyComponent={
              <View style={{ display: "flex", alignItems: "center" }}>
                <Text style={{ fontSize: 24, marginTop: 6 }}>Bag is empty</Text>
                <Text style={{ color: "grey", marginTop: 6 }}>
                  Go find some fancy collectibles!
                </Text>
                <Text style={{ fontSize: 50, marginTop: 12 }}>🎒</Text>
              </View>
            }
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
