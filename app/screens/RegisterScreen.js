import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as firebase from "firebase";

import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import ErrorMessages from "../components/forms/ErrorMessages";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function RegisterScreen({ navigation }) {
  const [signupFailed, setSignupFailed] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const authContext = useContext(AuthContext);

  // Request Permission for signup
  const signup = async ({ email, password }) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log("Account Created");
      setSignupFailed(false);
      const user = firebase.auth().currentUser;
      console.log("User: ", user.uid);
      authContext.useState(true);
      //authContext.setUser(user.uid);
      //firebase.database().ref('Accounts/${user.uid}').set()
    } catch (error) {
      console.log("Error Catched", error);
      setSignupFailed(true);
      setSignUpError(error);
    }
  };

  return (
    <Screen style={styles.containner}>
      <Image source={require("../assets/logo-red.png")} style={styles.logo} />

      <Formik
        initialValues={{ name: "", email: "", password: "" }} // handleChange
        onSubmit={signup} // handleSubmit
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <ErrorMessages error={signUpError} visible={signupFailed} />
            <AppFormField
              name="name"
              icon="account"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Name"
            />
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
            <SubmitButton title="Register" on />
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
