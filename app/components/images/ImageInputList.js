import React, { useRef } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

export default function ImageInputList({
  imageURIs = [],
  onRemoveImage,
  onAddImage,
}) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        horizontal={true}
        ref={scrollView}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.containeer}>
          {imageURIs.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput
                imageURI={uri}
                onchangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          <ImageInput onchangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containeer: {
    flexDirection: "row",
    padding: 10,
  },
  image: {
    marginRight: 10,
  },
});
