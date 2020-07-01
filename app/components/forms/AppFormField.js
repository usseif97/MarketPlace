import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppTextInput from "../AppTextInput";
import ErrorMessages from "./ErrorMessages";
import { useFormikContext } from "formik";

export default function AppFormField({ name, width, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched("name")}
        onChangeText={handleChange("name")}
        width={width}
        {...otherProps}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({});
