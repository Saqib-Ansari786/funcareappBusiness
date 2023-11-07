import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { Avatar, Button, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { COLORS, images } from "../constants";
import { useDispatch, useSelector } from "react-redux";

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const { userRequest } = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://funcare-backend.vercel.app/api/auth/businessuser/${userId}`
        );
        const responseData = await response.json();
        console.log(responseData);
        setUserData(responseData.user);
        dispatch({ type: "SET_USER_REQUEST", payload: false });
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    // Fetch or update data here
    fetchUser();
  }, [userRequest]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <>
          <View style={styles.tab}>
            <Avatar.Image
              style={styles.avatar}
              size={50}
              source={{ uri: userData.image }}
            />
            <Text style={styles.name}>
              {" "}
              {userData.name ? userData.name : "Unknown"}
            </Text>
          </View>
          <List.Section>
            <List.Subheader>Profile Details</List.Subheader>

            <List.Item
              title="Email Address"
              description={userData.email}
              left={() => <List.Icon icon="home" />}
            />
            <List.Item
              title="Earnings"
              description="Rs. 0"
              left={() => <List.Icon icon="cash" />}
            />
          </List.Section>
          <TouchableHighlight
            style={styles.editButton}
            onPress={() => navigation.navigate("EditUser", { userData })}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableHighlight>
        </>
      )}
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
