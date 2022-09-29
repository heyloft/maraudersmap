import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { RootStackParamList } from "../../App";

const BagScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Bag">) => {
  const DATA = [
    {
      title: "Collectibles",
      data: ["Ancient T-shirt", "Hotel Whiskey", "Victor Golf"],
    },
  ];

  const Item = ({ title }: { title: string }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{title}</Text>
    </View>
  );

  return (
    <View>
      <View style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
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
