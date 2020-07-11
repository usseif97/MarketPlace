import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as firebase from "firebase";

import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import AppFormField from "../components/forms/AppFormField";
import ErrorMessages from "../components/forms/ErrorMessages";
import SubmitButton from "../components/forms/SubmitButton";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen() {
  const [signinFailed, setSigninFailed] = useState(false);
  const [signinError, setSigninError] = useState("");
  const authContext = useContext(AuthContext);

  // Request Permission for signin
  const signin = async ({ email, password }) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Logged in successfully");
      setSigninFailed(false);
      const user = firebase.auth().currentUser;
      console.log("User: ", user.uid);
      authContext.useState(true);
    } catch (error) {
      console.log("Error Catched", error);
      setSigninFailed(true);
      setSigninError(error);
    }
  };
  return (
    <Screen style={styles.containner}>
      <Image source={require("../assets/logo-red.png")} style={styles.logo} />

      <Formik
        initialValues={{ email: "", password: "" }} // handleChange
        onSubmit={signin} // handleSubmit
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <ErrorMessages error={signinError} visible={signinFailed} />
            <AppFormField
              name="email"
              icon="email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="Email"
            />
            <AppFormField
              name="password"
              icon="lock"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              placeholder="Password"
            />
            <SubmitButton title="Login" />
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
