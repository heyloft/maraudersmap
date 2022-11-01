import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ItemCard = ({
  title,
  description,
}: {
  title: string;
  description: string | undefined;
}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    {description && <Text style={styles.subtitle}>{description}</Text>}
  </View>
);

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
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#696969",
  },
});

export default ItemCard;
