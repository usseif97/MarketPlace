import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import AppText from "./AppText";
import Screen from "../components/Screen";
import PickerItem from "./PickerItem";
import AppButton from "../components/AppButton";

export default function AppPicker({
  selectedItem,
  onSelectedItem,
  PickerItemComponent = PickerItem,
  numberOfColumns = 1,
  icon,
  placeholder,
  items,
  width = "100%",
}) {
  const [ModalVisible, setModalVisible] = useState(false); // useState return Array "ModalVisible" is the used Variable & "setModalVisible" change it

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.containeer, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.grey}
              style={styles.icon}
            />
          )}
          <AppText style={styles.text}>
            {selectedItem ? selectedItem.label : placeholder}
          </AppText>
          {icon && (
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color={colors.grey}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={ModalVisible} animationType="slide">
        <Screen>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectedItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
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
  text: {
    flex: 1,
  },
});
