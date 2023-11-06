import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { images } from "../constants";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native";
import { useDispatch } from "react-redux";

const EditUser = ({ route }) => {
  const { userData } = route.params;
  const navigation = useNavigation();
  const [name, setName] = React.useState(userData.name ? userData.name : "");
  const [email, setEmail] = React.useState(userData.email);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://starter-express-api-git-main-salman36.vercel.app/api/auth/businessuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch({ type: "SET_USER_REQUEST", payload: true });
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.tab}>
        <Avatar.Image
          style={styles.avatar}
          size={50}
          source={images.onboardingImage}
        />
        <Text style={styles.name}>{userData.name}</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <AntDesign name="user" size={20} style={styles.inputIcon} />
          <TextInput
            label="Username"
            mode="outlined"
            style={styles.input}
            placeholder="Enter your username"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="mail" size={20} style={styles.inputIcon} />
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 80,
    marginBottom: 20,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
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
