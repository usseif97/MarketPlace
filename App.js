import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import AppButton from "./app/components/AppButton";
import Card from "./app/components/Card";
import DetailsScreen from "./app/screens/DetailsScreen";
import MessagesScreen from "./app/screens/MessagesScreen";
import Icon from "./app/components/Icon";
import Screen from "./app/components/Screen";
import ListItem from "./app/components/ListItem";
import AccountScreen from "./app/screens/AccountScreen";
import ListingsScreen from "./app/screens/ListingsScreen";
import AppTextInput from "./app/components/AppTextInput";
import AppPicker from "./app/components/AppPicker";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ListingEditScreen from "./app/screens/ListingEditScreen";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import ImageInput from "./app/components/images/ImageInput";
import ImageInputList from "./app/components/images/ImageInputList";
import * as firebase from "firebase";

import navigationTheme from "./app/navigation/navigationTheme";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";

export default function App() {
  // useEffect (function Component)
  // componentDidMount (Class Component)
  useEffect(() => {
    if (!firebase.apps.length) {
      var firebaseConfig = {
        apiKey: "AIzaSyB57ZS_wWB0Pgk0HyILjbR13iMH4XcfLbA",
        authDomain: "marketplace-bc59a.firebaseapp.com",
        databaseURL: "https://marketplace-bc59a.firebaseio.com",
        projectId: "marketplace-bc59a",
        storageBucket: "marketplace-bc59a.appspot.com",
        messagingSenderId: "674440830131",
        appId: "1:674440830131:web:63b2ab475ab3efc6b3e4c6",
        measurementId: "G-CM3L3LSYZ7",
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      //firebase.analytics();
    }
  }, []); // empty array [] make it called only the first time
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
