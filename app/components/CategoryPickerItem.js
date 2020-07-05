import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "../components/Icon";
import AppText from "./AppText";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CategoryPickerItem({ item, onPress }) {
  return (
    <View style={styles.containeer}>
      <TouchableOpacity>
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={80}
        />
      </TouchableOpacity>
      <AppText style={styles.label}>{item.label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  containeer: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
});
