import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import colors from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default function ImageInput({ imageURI, onchangeImage }) {
  // Request Permission for Inage Picking
  const requestPermission = async () => {
    const permssion = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (permssion.granted) {
      const result = await ImagePicker.getCameraRollPermissionsAsync();
      if (!result.granted)
        alert("You need to enable permission to access Library");
    }
  };

  // useEffect (function Component)
  // componentDidMount (Class Component)
  useEffect(() => {
    requestPermission();
  }, []); // empty array [] make it called only the first time

  const handlePress = () => {
    if (!imageURI) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image", [
        { text: "YES", onPress: () => onchangeImage(null) },
        { text: "NO" },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onchangeImage(result.uri); // onchangeImage() Call function
    } catch (error) {
      console.log("Error while reading Image", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.containeer}>
        {!imageURI && (
          <MaterialCommunityIcons name="camera" size={40} color={colors.grey} />
        )}
        {imageURI && <Image source={{ uri: imageURI }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  containeer: {
    backgroundColor: colors.light,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    overflow: "hidden", // for Image
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
