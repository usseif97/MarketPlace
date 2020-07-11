import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as firebase from "firebase";
import axios from "axios";

import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppFormPicker from "../components/forms/AppFormPicker";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.string().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().nullable().label("Category"),
  images: Yup.array().min(1, "Please Select at least one Image"),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

export default function ListingEditScreen() {
  const [uploadVisible, setUploadVisible] = useState(false); // Modal
  const [onDoneVisible, setOnDoneVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const addListing = async ({
    title,
    price,
    description,
    category,
    images,
  }) => {
    var size = 0;
    var newIndex = 0;

    try {
      const response = await firebase
        .database()
        .ref("timeLine")
        .once("value", (data) => {
          size = Object.keys(data.val()).length;
          console.log("Size: ", size);
        });
      newIndex = size + 1;
    } catch (error) {
      alert(error);
    }

    try {
      const response2 = await firebase
        .database()
        .ref("timeLine/" + newIndex.toString())
        .set({
          id: newIndex,
          categoryID: category.value,
          title: title,
          price: price,
          description: description,
          userID: firebase.auth().currentUser.uid,
          images: { url: images[0] },
        });
      // Progress Bar
      setProgress(0);
      setUploadVisible(true);
      setOnDoneVisible(false);
      for (var i = 0.1; i < 1; i += 0.1) {
        setTimeout(() => {
          setProgress(i);
        }, 500);
      }
      setTimeout(() => {
        setOnDoneVisible(true);
      }, 1000);
      // Suceess
    } catch (error) {
      setUploadVisible(false);
      alert(error);
    }
  };

  return (
    <Screen style={styles.containner}>
      <UploadScreen
        progress={progress}
        visible={uploadVisible}
        onDone={onDoneVisible}
        finish={() => setUploadVisible(false)}
      />
      <Formik
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }} // handleChange
        onSubmit={addListing} // handleSubmit
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <FormImagePicker name="images" />
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
