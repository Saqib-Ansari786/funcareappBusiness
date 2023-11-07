import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import { SIZES, images } from "../constants";
import Header from "../components/Header";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  playland_name: yup.string().required("Playland name is required"),
  timing1: yup.string().required("Timing is required"),
  timing2: yup.string().required("Timing is required"),
  timing3: yup.string().required("Timing is required"),
});

const EditDetailScreen = ({ route, navigation }) => {
  const { _id, playland_name, packages, timing1, timing2, timing3 } =
    route.params.playland;
  const [newname, setName] = useState(playland_name);
  const [newtiming1, setTiming1] = useState(timing1.timing);
  const [newtiming2, setTiming2] = useState(timing2.timing);
  const [newtiming3, setTiming3] = useState(timing3.timing);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSave = async (values) => {
    // Save the changes and navigate back to the previous screen
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://funcare-backend.vercel.app/api/auth/playlanduser/update/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            playland_name: values.playland_name,
            timing1: {
              timing: values.timing1,
            },
            timing2: {
              timing: values.timing2,
            },
            timing3: {
              timing: values.timing3,
            },
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch({ type: "SET_PLAYLAND_UPDATE", payload: true });
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Text style={styles.heading}>Edit Details</Text>
      <Formik
        initialValues={{
          playland_name: newname,
          timing1: newtiming1,
          timing2: newtiming2,
          timing3: newtiming3,
        }}
        validationSchema={validationSchema}
        onSubmit={onSave}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Playland Name:</Text>
              <MaterialIcons
                name="face"
                size={24}
                color="#888"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                value={values.playland_name}
                onChangeText={handleChange("playland_name")}
                placeholder="Name"
                placeholderTextColor="#888"
                onBlur={handleBlur("playland_name")}
              />
              {errors.playland_name && touched.playland_name && (
                <Text style={styles.error}>{errors.playland_name}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Timing 1:</Text>
              <MaterialIcons
                name="face"
                size={24}
                color="#888"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                value={values.timing1}
                onChangeText={handleChange("timing1")}
                placeholder="Timing"
                placeholderTextColor="#888"
                onBlur={handleBlur("timing1")}
              />
              {errors.timing1 && touched.timing1 && (
                <Text style={styles.error}>{errors.timing1}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Timing 2:</Text>
              <MaterialIcons
                name="face"
                size={24}
                color="#888"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                value={values.timing2}
                onChangeText={handleChange("timing2")}
                placeholder="Timing"
                placeholderTextColor="#888"
                onBlur={handleBlur("timing2")}
              />
              {errors.timing2 && touched.timing2 && (
                <Text style={styles.error}>{errors.timing2}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Timing 3:</Text>
              <MaterialIcons
                name="face"
                size={24}
                color="#888"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                value={values.timing3}
                onChangeText={handleChange("timing3")}
                placeholder="Timing"
                placeholderTextColor="#888"
                onBlur={handleBlur("timing3")}
              />
              {errors.timing3 && touched.timing3 && (
                <Text style={styles.error}>{errors.timing3}</Text>
              )}
            </View>

            {isLoading ? (
              <ActivityIndicator size="large" color="#FBC02D" />
            ) : (
              <Button
                style={styles.saveButton}
                mode="contained"
                onPress={handleSubmit}
              >
                Save Changes
              </Button>
            )}
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 70,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 50,
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: "#FBC02D",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  icon: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default EditDetailScreen;
