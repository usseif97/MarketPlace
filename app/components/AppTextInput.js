import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

export default function AppTextInput({ icon, width = "100%", ...otherprops }) {
  return (
    <View style={[styles.containeer, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.grey}
          style={styles.icon}
        />
      )}
      <TextInput style={defaultStyles.text} {...otherprops} />
    </View>
  );
}

const styles = StyleSheet.create({
  containeer: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
