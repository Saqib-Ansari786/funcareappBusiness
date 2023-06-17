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
  price: yup.number().required("Price is required").min(100).max(10000),
  discount: yup.number().required("Discount is required").min(0).max(100),
  discription: yup.string().required("Description is required"),
});

const EditDetailScreen = ({ route, navigation }) => {
  const { landdata } = useSelector((state) => state.landdata);
  const { _id, playland_name, price, discount, discription } = landdata[0];
  const [newname, setName] = useState(playland_name);
  const [newprice, setPrice] = useState(price.toString());
  const [newdiscount, setDiscount] = useState(discount.toString());
  const [newdiscription, setDiscription] = useState(discription);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSave = async (values) => {
    // Save the changes and navigate back to the previous screen
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://starter-express-api-git-main-salman36.vercel.app/api/auth//playlanduser/update/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            playland_name: values.playland_name,
            price: values.price,
            discount: values.discount,
            discription: values.discription,
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
          price: newprice,
          discount: newdiscount,
          discription: newdiscription,
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
              <Text style={styles.label}>Price:</Text>
              <MaterialIcons
                name="local-offer"
                size={24}
                color="#888"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                value={values.price}
                onChangeText={handleChange("price")}
                placeholder="Price"
                placeholderTextColor="#888"
                keyboardType="numeric"
                onBlur={handleBlur("price")}
              />
              {errors.price && touched.price && (
                <Text style={styles.error}>{errors.price}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Discount:</Text>

              <MaterialIcons
                name="local-offer"
                size={24}
                color="#888"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                value={values.discount}
                onChangeText={handleChange("discount")}
                placeholder="Discount"
                placeholderTextColor="#888"
                keyboardType="numeric"
                onBlur={handleBlur("discount")}
              />
              {errors.discount && touched.discount && (
                <Text style={styles.error}>{errors.discount}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description:</Text>
              <TextInput
                style={[styles.input, { height: SIZES.height * 0.2 }]}
                value={values.discription}
                onChangeText={handleChange("discription")}
                placeholder="Description"
                placeholderTextColor="#888"
                multiline
                numberOfLines={4}
                onBlur={handleBlur("discription")}
              />
              {errors.discription && touched.discription && (
                <Text style={styles.error}>{errors.discription}</Text>
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
