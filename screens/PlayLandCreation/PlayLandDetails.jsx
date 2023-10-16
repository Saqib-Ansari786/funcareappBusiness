import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { FlatList } from "react-native";

const PackageSchema = Yup.object().shape({
  packageName: Yup.string().required("Package Name is required"),
  price: Yup.number()
    .required("Price is required")
    .min(100, "Price must be at least 100")
    .max(10000, "Price can't be more than 10,000"),
  discount: Yup.number()
    .required("Discount is required")
    .min(0, "Discount must be at least 0")
    .max(100, "Discount can't be more than 100"),
  description: Yup.string().required("Description is required"),
});

export default function PlaylandDescription() {
  const dispatch = useDispatch();
  const existingPackages = useSelector(
    (state) => state.playland.existingPackages
  );
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleEditPackage = (packageIndex) => {
    setSelectedPackage(existingPackages[packageIndex]);
  };

  const handleSavePackage = (values) => {
    if (selectedPackage) {
      // Edit existing package
      const updatedPackages = [...existingPackages];
      updatedPackages[existingPackages.indexOf(selectedPackage)] = values;
      dispatch({ type: "SET_PACKAGES", payload: updatedPackages });
    } else {
      // Add new package
      dispatch({
        type: "SET_PACKAGES",
        payload: [...existingPackages, values],
      });
    }
    setSelectedPackage(null);
  };

  return (
    <FlatList
      data={existingPackages}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => handleEditPackage(index)}>
          <Text>{item.package_name}</Text>
          <Text>{item.price}</Text>
          <Text>{item.discount}</Text>
          <Text>{item.discription}</Text>
        </TouchableOpacity>
      )}
      ListHeaderComponent={
        <View>
          <Formik
            initialValues={selectedPackage || {}}
            validationSchema={PackageSchema}
            onSubmit={handleSavePackage}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <TextInput
                  mode="outlined"
                  label={"Package Name"}
                  placeholder="Enter Package Name"
                  style={styles.textInput}
                  onChangeText={handleChange("packageName")}
                  onBlur={handleBlur("packageName")}
                  value={values.packageName}
                  error={errors.packageName && touched.packageName}
                />

                <TextInput
                  mode="outlined"
                  label={"Price"}
                  placeholder="Enter Price"
                  style={styles.textInput}
                  onChangeText={handleChange("price")}
                  onBlur={handleBlur("price")}
                  value={values.price}
                  error={errors.price && touched.price}
                  keyboardType="numeric"
                />

                <TextInput
                  mode="outlined"
                  label={"Any Discount"}
                  placeholder="Enter Discount"
                  style={styles.textInput}
                  onChangeText={handleChange("discount")}
                  onBlur={handleBlur("discount")}
                  value={values.discount}
                  error={errors.discount && touched.discount}
                  keyboardType="numeric"
                />

                <TextInput
                  mode="outlined"
                  label={"Description"}
                  placeholder="Enter your playland Description"
                  style={[styles.textInput, { height: 120 }]}
                  multiline
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  error={errors.description && touched.description}
                />

                <Button onPress={handleSubmit} title="Save Package" />
              </View>
            )}
          </Formik>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 10,
  },
});
