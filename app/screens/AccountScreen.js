import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import * as firebase from "firebase";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import Icon from "../components/Icon";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import ListItemSeperator from "../components/ListItemSeperator";
import AppActivityIndicator from "../components/AppActivityIndicator";

import AuthContext from "../auth/context";
import routes from "../navigation/routes";
import useAPI from "../hooks/useAPI";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MY_LISTINGS,
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondry,
    },
    targetScreen: routes.MESSAGES,
  },
];

export default function AccountScreen({ navigation }) {
  const authContext = useContext(AuthContext);

  const user = firebase.auth().currentUser.uid;

  const { data: info, error, loading, request: loadInfo } = useAPI(
    "Accounts/" + user
  );

  const updateImage = async (uri) => {
    try {
      const response = await firebase
        .database()
        .ref("Accounts/" + user)
        .update({
          image: uri,
        })
        .then(() => console.log("Data updated."));
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    console.log("Account Screen Rendered");
    loadInfo();
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
      <View style={styles.containeer}>
        <ListItem
          title={info[4]}
          subTitle={info[0]}
          image={info[1]}
          imageInput={1}
          action={updateImage}
        />
      </View>
      <View style={styles.containeer}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeperator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              ImageComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="LogOut"
        ImageComponent={<Icon name="logout" backgroundColor={colors.yellow} />}
        onPress={() => authContext.setState(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  containeer: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});
