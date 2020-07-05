import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFormikContext } from "formik";

import ImageInputList from "../images/ImageInputList";
import ErrorMessages from "./ErrorMessages";

export default function FormImagePicker({ name }) {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  const imageURIs = values[name]; // current displayed images

  const handleAddImage = (uri) => {
    setFieldValue(name, [...imageURIs, uri]); // take copy of array then add the new image to the Field that have the name
  };

  const handleRemoveImage = (uri) => {
    setFieldValue(
      name,
      imageURIs.filter((imageURI) => imageURI !== uri)
    ); // filter Array and remove the selected one
  };

  return (
    <>
      <ImageInputList
        imageURIs={imageURIs}
        onAddImage={handleAddImage}
        onRemoveImage={handleRemoveImage}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({});
