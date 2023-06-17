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

const EditDetailScreen = ({ route, navigation }) => {
  const { landdata } = useSelector((state) => state.landdata);
  const { _id, playland_name, price, discount, discription } = landdata[0];
  const [newname, setName] = useState(playland_name);
  const [newprice, setPrice] = useState(price.toString());
  const [newdiscount, setDiscount] = useState(discount.toString());
  const [newdiscription, setDiscription] = useState(discription);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSave = async () => {
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
            playland_name: newname,
            price: newprice,
            discount: newdiscount,
            discription: newdiscription,
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Playland Name:</Text>
        <MaterialIcons name="face" size={24} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={newname}
          onChangeText={(text) => setName(text)}
          placeholder="Name"
          placeholderTextColor="#888"
        />
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
          value={newprice}
          onChangeText={(text) => setPrice(text)}
          placeholder="Price"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
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
          value={newdiscount}
          onChangeText={(text) => setDiscount(text)}
          placeholder="Discount"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, { height: SIZES.height * 0.2 }]}
          value={newdiscription}
          onChangeText={(text) => setDiscription(text)}
          placeholder="Description"
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#FBC02D" />
      ) : (
        <Button style={styles.saveButton} mode="contained" onPress={onSave}>
          Save Changes
        </Button>
      )}
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
});

export default EditDetailScreen;
