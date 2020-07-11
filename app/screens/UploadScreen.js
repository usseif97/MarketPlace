import React from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

export default function UploadScreen({
  progress = 0,
  visible = false,
  onDone = false,
  finish = false,
}) {
  return (
    <Modal visible={visible} animationType="slide">
      <Screen style={styles.containeer}>
        <>
          {progress < 9 ? (
            <Progress.Bar
              progress={progress}
              color={colors.primary}
              width={200}
            />
          ) : null}
          {onDone ? (
            <LottieView
              source={require("../assets/animations/done.json")}
              autoPlay
              loop={false}
              onAnimationFinish={finish}
              style={styles.animation}
            />
          ) : null}
        </>
      </Screen>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 500,
  },
  containeer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
