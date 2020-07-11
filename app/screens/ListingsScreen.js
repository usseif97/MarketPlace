import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import * as firebase from "firebase";

import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";

import routes from "../navigation/routes";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppActivityIndicator from "../components/AppActivityIndicator";
import useAPI from "../hooks/useAPI";

/*const listings = [
  {
    id: 1,
    title: "Red Jacket",
    price: 100,
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 200,
    image: require("../assets/couch.jpg"),
  },
];*/

export default function ListingsScreen({ navigation }) {
  /*const [listings, setListings] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadListings = async () => {
    try {
      setLoading(true); // start Loading Data
      const response = await firebase
        .database()
        .ref("timeLine")
        .on("value", (data) => {
          setListings(Object.values(data.val()));
          //console.log(data.toJSON());
        });
      setLoading(false); // Finish Loading Data
      setError(false);
    } catch (error) {
      setError(true);
    }
  };*/

  const { data: listings, error, loading, request: loadListings } = useAPI(
    "timeLine"
  );

  useEffect(() => {
    console.log("Listing Screen Rendered");
    loadListings();
  }, []);

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Couldn't retrive listings</AppText>
          <AppButton title="Retry" onPress={loadListings} color="primary" />
        </>
      )}
      <AppActivityIndicator visible={loading} />
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            image={item.images.url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)} // pass parameter item while navigation
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});
