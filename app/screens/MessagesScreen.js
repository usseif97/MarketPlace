import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ListView,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import routes from "../navigation/routes";

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
  const [messages, setMessages] = useState(intialMessages);
  const [refreshing, setRefresh] = useState(false);

  const handelDelete = (message) => {
    // iterate on all messages one by one (m) then applay filter to them
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => navigation.navigate(routes.CHAT)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handelDelete(item)} />
            )}
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

const styles = StyleSheet.create({});
