import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppFormPicker from "../components/forms/AppFormPicker";
import CategoryPickerItem from "../components/CategoryPickerItem";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.string().required().min(1).max(10000).label("Price"),
  description: Yup.string().required().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
});

const categories = [
  { label: "Furniture", value: 1, backgroundColor: "red", icon: "apps" },
  { label: "Clothing", value: 2, backgroundColor: "green", icon: "email" },
  { label: "Camera", value: 3, backgroundColor: "blue", icon: "lock" },
  { label: "Games", value: 4, backgroundColor: "blue", icon: "lock" },
  { label: "Clothing", value: 5, backgroundColor: "blue", icon: "lock" },
  { label: "Sport", value: 6, backgroundColor: "blue", icon: "lock" },
  { label: "Movies & Music", value: 7, backgroundColor: "blue", icon: "lock" },
  { label: "Books", value: 8, backgroundColor: "blue", icon: "lock" },
  { label: "Other", value: 9, backgroundColor: "blue", icon: "lock" },
];

export default function ListingEditScreen() {
  return (
    <Screen style={styles.containner}>
      <Image source={require("../assets/logo-red.png")} style={styles.logo} />

      <Formik
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
        }} // handleChange
        onSubmit={(values) => console.log(values)} // handleSubmit
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <AppFormField
              name="title"
              icon="application"
              maxLength={255}
              placeholder="Title"
            />
            <AppFormField
              name="price"
              icon="gift"
              maxLength={8}
              keyboardType="numeric"
              placeholder="Price"
              width={120}
            />
            <AppFormPicker
              name="category"
              icon="widgets"
              PickerItemComponent={CategoryPickerItem}
              numberOfColumns={3}
              items={categories}
              placeholder="Category"
              width="50%"
            />
            <AppFormField
              name="description"
              icon="format-paragraph"
              multiline
              maxLength={255}
              numberOfLines={3}
              placeholder="Description"
            />
            <SubmitButton title="Post" />
          </>
        )}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  containner: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
