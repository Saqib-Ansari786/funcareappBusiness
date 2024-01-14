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
import { Formik } from "formik";
import * as Yup from "yup";
import { Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const validationSchema = Yup.object().shape({
  location: Yup.string().url("Invalid URL").required("Required"),
});

export default function Playlandlocation() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch({ type: "SET_LOCATION", payload: values.location });
    console.log(values.location);
    navigation.navigate("PlaylandDescription");
  };

  const handleOpenLink = async () => {
    // Check if the device supports opening the given URL
    const url = "https://maps.google.com/maps";
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Open the URL in the default browser
      await Linking.openURL(url);
    } else {
      console.log("Cannot open URL: " + url);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/images/map.jpg")}
        style={styles.image}
      />

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
      </View>
      <TouchableOpacity onPress={handleOpenLink}>
        <Text style={styles.text}>Go to Google Maps</Text>
      </TouchableOpacity>
      <Formik
        initialValues={{ location: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="location-outline" size={34} color="black" />
              <TextInput
                label="Location Link"
                mode="outlined"
                onChangeText={handleChange("location")}
                onBlur={handleBlur("location")}
                value={values.location}
                error={touched.location && errors.location}
                style={styles.textInput}
              />
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  text: {
    ...FONTS.h1,
    marginVertical: 20,
  },
  buttonText: {
    ...FONTS.h2,
    color: COLORS.white,
    letterSpacing: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    position: "absolute",
    opacity: 0.6,
  },

  textInput: {
    height: SIZES.height * 0.06,
    width: SIZES.width * 0.8,
    margin: SIZES.radius,
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: SIZES.radius * 0.7,
    margin: SIZES.radius,
    borderRadius: SIZES.radius,
    width: SIZES.width * 0.4,
  },
});
