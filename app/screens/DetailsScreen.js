import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as firebase from "firebase";

import colors from "../config/colors";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import routes from "../navigation/routes";

export default function DetailsScreen({ route, navigation }) {
  const listings = route.params;

  const user = firebase.auth().currentUser.uid;

  const { data: info, error, loading, request: loadInfo } = useAPI(
    "Accounts/" + listings.userID
  );

  useEffect(() => {
    console.log("Details Screen Rendered");
    loadInfo();
  }, []);

  return (
    <View>
      <Image source={{ uri: listings.images.url }} style={styles.image} />
      <View style={styles.detailsContaineer}>
        <AppText style={styles.title}>{listings.title}</AppText>
        <AppText style={styles.subTitle}>{listings.price}$</AppText>
        {listings.description === "" ? (
          <AppText style={styles.description}>{"..."}</AppText>
        ) : (
          <AppText style={styles.description}>{listings.description}</AppText>
        )}
        <View style={styles.infoContaineer}>
          <ListItem
            image={info[1]}
            imageInput={0}
            title={info[4]}
            subTitle={info[0]}
            onPress={() =>
              navigation.navigate(routes.CHAT, { to: listings.userID })
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContaineer: {
    padding: 20,
  },
  description: {
    color: colors.grey,
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  infoContaineer: {
    marginVertical: 20,
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
