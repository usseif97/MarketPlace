import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import colors from "../config/colors";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";

export default function DetailsScreen() {
  return (
    <View>
      <Image source={require("../assets/jacket.jpg")} style={styles.image} />
      <View style={styles.detailsContaineer}>
        <AppText style={styles.title}>Red Jacket</AppText>
        <AppText style={styles.subTitle}>100$</AppText>
        <ListItem
          image={require("../assets/usseif.jpg")}
          title="Usseif"
          subTitle="5 Listings"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContaineer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  subTitle: {
    color: colors.secondry,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 2,
  },
  title: {
    fontSize: 40,
    fontWeight: "500",
    marginBottom: 2,
  },
});