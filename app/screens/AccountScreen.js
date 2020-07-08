import React, { useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import * as firebase from "firebase";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import Icon from "../components/Icon";
import colors from "../config/colors";
import ListItemSeperator from "../components/ListItemSeperator";
import AuthContext from "../auth/context";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondry,
    },
    targetScreen: "Messages",
  },
];

export default function AccountScreen({ navigation }) {
  const authContext = useContext(AuthContext);

  const user = firebase.auth().currentUser;

  return (
    <Screen style={styles.screen}>
      <View style={styles.containeer}>
        <ListItem
          title={user.email}
          //subTitle={user.email}
          image={require("../assets/usseif.jpg")}
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
        onPress={() => authContext.setUser(null)}
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
