import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { Image } from "react-native";
import { images, COLORS, FONTS, SIZES, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

export default function Playlandlocation() {
  const navigation = useNavigation();
  const [locationLink, setLocationLink] = useState("");
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image source={images.location} style={styles.image} />

      <View
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          right: 20,
          //height: 50,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Image
              source={icons.back}
              resizeMode="cover"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => {
              console.log("Menu on pressed");
            }}
          >
            <Image
              source={icons.menu}
              resizeMode="cover"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={styles.textInput}
        label="Enter the Google Maps location link"
        value={locationLink}
        onChangeText={setLocationLink}
        right={<TextInput.Icon name="information-outline" />}
        // Add the following props for the guidelines box
        mode="outlined"
        dense={true}
        placeholder="e.g. https://goo.gl/maps/abc123"
      />

      <Button
        mode="contained-tonal"
        icon={"chevron-right"}
        onPress={() => {
          dispatch({ type: "SET_LATITUDE", payload: locationLink });
          navigation.navigate("PlaylandDescription");
        }}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...FONTS.h2,
    marginVertical: 20,
  },
  buttonText: {
    ...FONTS.h2,
  },
  image: {
    width: "100%",
    height: 500,
    marginBottom: 20,
  },

  textInput: {
    height: SIZES.height * 0.09,
    width: SIZES.width * 0.9,
    margin: SIZES.radius,
  },
});
