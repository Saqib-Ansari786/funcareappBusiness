import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { SIZES, images } from "../constants";
import Header from "../components/Header";

const EditDetailScreen = ({ route, navigation }) => {
  const [price, setPrice] = useState("10");
  const [discount, setDiscount] = useState("20");
  const [packages, setPackages] = useState("jsjaj");

  const onSave = () => {
    // Save the changes and navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.heading}>Edit Details</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Discount:</Text>
        <TextInput
          style={styles.input}
          value={discount}
          onChangeText={(text) => setDiscount(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Packages:</Text>
        <TextInput
          style={[styles.input, { height: SIZES.height * 0.2 }]}
          value={packages}
          onChangeText={(text) => setPackages(text)}
          multiline
          numberOfLines={4}
        />
      </View>
      <Button style={styles.saveButton} mode="contained" onPress={onSave}>
        Save Changes
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
    paddingHorizontal: 10,
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: "#FBC02D",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default EditDetailScreen;
