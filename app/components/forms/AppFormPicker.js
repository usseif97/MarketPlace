import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppTextInput from "../AppTextInput";
import ErrorMessages from "./ErrorMessages";
import { useFormikContext } from "formik";
import AppPicker from "../AppPicker";

export default function AppFormPicker({
  items,
  name,
  placeholder,
  PickerItemComponent,
  numberOfColumns,
  icon,
  width,
}) {
  const { setFieldValue, errors, touched, values } = useFormikContext();

  return (
    <>
      <AppPicker
        items={items}
        onSelectedItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        numberOfColumns={numberOfColumns}
        selectedItem={values[name]}
        PickerItemComponent={PickerItemComponent}
        icon={icon}
        width={width}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({});
