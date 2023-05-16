import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Avatar, Button, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { images } from "../constants";

const UserProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        <Avatar.Image
          style={styles.avatar}
          size={50}
          source={images.skiVilla}
        />
        <Text style={styles.name}>John Doe</Text>
      </View>
      <List.Section>
        <List.Subheader>Profile Details</List.Subheader>
        <List.Item
          title="Phone Number"
          description="555-1234"
          left={() => <List.Icon icon="phone" />}
        />
        <List.Item
          title="Playland Name"
          description="The Fun Zone"
          left={() => <List.Icon icon="home" />}
        />
        <List.Item
          title="Earnings"
          description="$1000"
          left={() => <List.Icon icon="cash" />}
        />
        <List.Item
          title="Description"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis, lectus non molestie blandit, purus justo finibus magna, eget lobortis ex sapien ac velit."
          left={() => <List.Icon icon="information" />}
        />
      </List.Section>
      <TouchableHighlight
        style={styles.editButton}
        onPress={() => navigation.navigate("EditUser")}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableHighlight>
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
    marginBottom: 20,
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
  editButton: {
    marginLeft: 10,
    marginVertical: 50,
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
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default UserProfileScreen;
