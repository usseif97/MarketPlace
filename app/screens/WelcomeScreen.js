import React from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

export default function WelcomeScreen() {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
      blurRadius={3}
    >
      <View style={styles.logoContaineer}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <Text style={styles.tagLine}>Sell What You Need !!</Text>
      </View>
      <View style={styles.buttonContaineer}>
        <AppButton title="Login" color="primary" />
        <AppButton title="Register" color="secondry" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end", // Primary Axis
    alignItems: "center", // Secondry Axis
  },
  buttonContaineer: {
    width: "100%",
    padding: 20,
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#fc5c65",
  },
  logoContaineer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#4ecdc4",
  },
  tagLine: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});
