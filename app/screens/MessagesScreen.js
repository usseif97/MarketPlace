import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ListView,
  Platform,
  StatusBar,
  SafeAreaView,
  Button,
} from "react-native";

import * as firebase from "firebase";

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppActivityIndicator from "../components/AppActivityIndicator";

const intialMessages = [
  {
    id: 1,
    title: "T1",
    description: "D1",
    image: require("../assets/usseif.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../assets/mosh.jpg"),
  },
];

export default function MessagesScreen({ navigation }) {
  const [accounts, setAccounts] = useState([]);
  const [allAccounts, setAllAccounts] = useState([]);
  const [accountsInfo, setAccountsInfo] = useState([]);

  const [loading, setLoading] = useState(false);

  const user = firebase.auth().currentUser.uid;

  // Load Wanted Accounts
  const loadAccounts = async () => {
    try {
      const response = await firebase
        .database()
        .ref("Messages/" + user)
        .once("value", (data) => {
          setAccounts(Object.keys(data.val()));
        });
      console.log("ACCOUNTS: ", accounts);
    } catch (error) {
      alert(error);
    }
  };

  // Load Wanted Accounts
  const loadAllAccounts = async () => {
    try {
      const response = await firebase
        .database()
        .ref("Accounts")
        .once("value", (data) => {
          setAllAccounts(Object.values(data.val()));
          setAccountsInfo(Object.values(data.val()));
        });
      console.log("ALL ACCOUNTS: ", allAccounts);
    } catch (error) {
      alert(error);
    }
  };

  const filterAccountsInfo = () => {
    let ar;
    var arr = [];
    for (var i = 0; i < accounts.length; i++) {
      for (var j = 0; j < allAccounts.length; j++) {
        if (allAccounts[j].userID === accounts[i]) {
          arr.push(allAccounts[j]);
        }
      }
    }
    setAccountsInfo(arr);
    console.log("ACCOUNTS INFO: ", accountsInfo);
  };

  useEffect(() => {
    console.log("Messages Screen Rendered");
    setLoading(true); // start Loading Data
    loadAccounts();
    loadAllAccounts();
    filterAccountsInfo();
    setLoading(false); // Finish Loading Data
  }, []);

  const [messages, setMessages] = useState(intialMessages);
  const [refreshing, setRefresh] = useState(false);

  const handelDelete = (message) => {
    // iterate on all messages one by one (m) then applay filter to them
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      {/*<AppText>heeey</AppText>*/}
      <AppActivityIndicator visible={loading} />
      <AppButton
        title="My Contacts"
        onPress={filterAccountsInfo}
        color="primary"
        style={styles.button}
      />
      <FlatList
        data={accountsInfo}
        keyExtractor={(info) => info.userID}
        renderItem={({ item }) => (
          <ListItem
            title={item.username}
            subTitle={item.email}
            image={item.image}
            onPress={() =>
              navigation.navigate(routes.CHAT, { to: item.userID })
            }
            /*renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handelDelete(item)} />
            )}*/
          />
        )}
        ItemSeparatorComponent={ListItemSeperator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/mosh.jpg"),
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "50%",
    alignSelf: "center",
  },
});
