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

export default function MyListingsScreen({ navigation }) {
  const [listings, setListings] = useState([]);
  const [myListings, setMyListings] = useState([]);

  const [loading, setLoading] = useState(false);

  const user = firebase.auth().currentUser.uid;

  const loadMyListings = async () => {
    try {
      const response = await firebase
        .database()
        .ref("timeLine")
        .once("value", (data) => {
          setListings(Object.values(data.val()));
          setMyListings(Object.values(data.val()));
        });
      console.log("Listings: ", listings);
    } catch (error) {
      alert(error);
    }
  };

  const filterMyListings = () => {
    let ar;
    var arr = [];
    for (var i = 0; i < listings.length; i++) {
      if (listings[i].userID === user) {
        arr.push(listings[i]);
      }
    }
    setMyListings(arr);
    console.log("MY LISTINGS : ", myListings);
  };

  useEffect(() => {
    console.log("MyListings Screen Rendered");
    setLoading(true); // start Loading Data
    loadMyListings();
    setLoading(false); // Finish Loading Data
  }, []);

  return (
    <Screen style={styles.screen}>
      <AppActivityIndicator visible={loading} />
      <AppButton
        title="My Listings"
        onPress={filterMyListings}
        color="primary"
        style={styles.button}
      />
      <FlatList
        data={myListings}
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
  button: {
    width: "50%",
    alignSelf: "center",
    marginVertical: 10,
  },
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});
