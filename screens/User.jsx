import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Avatar, Button, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { images } from "../constants";
import { useDispatch, useSelector } from "react-redux";

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const { userRequest } = useSelector((state) => state.request);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(
  //         `http://starter-express-api-git-main-salman36.vercel.app/api/auth/user/record/${userId}`
  //       );
  //       const responseData = await response.json();
  //       setUserData(responseData.userRecord[0]);
  //       dispatch({ type: "SET_USER_REQUEST", payload: false });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //     setIsLoading(false);
  //   }
  //   // Fetch or update data here
  //   fetchUser();
  // }, [userRequest]);

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
