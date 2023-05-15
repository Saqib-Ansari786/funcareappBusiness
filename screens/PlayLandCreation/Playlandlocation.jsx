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
            <TextInput
              label="Location Link"
              mode="outlined"
              onChangeText={handleChange("location")}
              onBlur={handleBlur("location")}
              value={values.location}
              error={touched.location && errors.location}
              style={styles.textInput}
            />
            <Button mode="contained" onPress={handleSubmit}>
              Next
            </Button>
          </>
        )}
      </Formik>
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
