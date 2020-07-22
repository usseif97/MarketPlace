import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ChatScreen from "../screens/ChatScreen";
import MyListingsScreen from "../screens/MyListingsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="MyListings" component={MyListingsScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
