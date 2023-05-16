import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { images } from "../constants";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";

const EditUser = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.tab}>
        <Avatar.Image
          style={styles.avatar}
          size={50}
          source={images.onboardingImage}
        />
        <Text style={styles.name}>John Doe</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <AntDesign name="user" size={20} style={styles.inputIcon} />
          <TextInput
            label="Username"
            mode="outlined"
            style={styles.input}
            placeholder="Enter your username"
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="mail" size={20} style={styles.inputIcon} />
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.input}
            placeholder="Enter your email"
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={20} style={styles.inputIcon} />
          <TextInput
            label="Password"
            mode="outlined"
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  avatar: {
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  saveButton: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#ffcc00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default EditUser;
