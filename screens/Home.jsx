import { ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { COLORS, FONTS, images } from "../constants";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const navigation = useNavigation();
  const [playlands, setPlaylands] = useState([]);
  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    async function getPlaylands() {
      try {
        const response = await fetch(
          "http://starter-express-api-git-main-salman36.vercel.app/api/auth/user/playland",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_firebase_id: userId,
            }),
          }
        );
        const data = await response.json();
        setPlaylands(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getPlaylands();
  }, []);

  const goToManagePlaylands = () => {
    // navigation.navigate("ManagePlaylands");
  };
  const goToManageBookings = () => {
    // navigation.navigate("ManageBookings");
  };
  const goToAnalytics = () => {
    // navigation.navigate("Analytics");
  };
  const goToCustomerFeedback = () => {
    // navigation.navigate("CustomerFeedback");
  };
  const goToAccountSettings = () => {
    // navigation.navigate("AccountSettings");
  };
  const goToNotifications = () => {
    // navigation.navigate("Notifications");
  };

  return (
    <>
      {playlands.length > 0 ? (
        <View style={styles.container}>
          <Text style={styles.header}>Dashboard</Text>
          <View style={styles.metric}>
            <Text style={styles.metricText}>Bookings: 10</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricText}>Revenue: $1000</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricText}>Feedback: 4.5 stars</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={goToManagePlaylands}>
            <Ionicons name="ios-home-outline" size={30} color="white" />
            <Text style={styles.buttonText}>Manage Playlands</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToManageBookings}>
            <Ionicons name="ios-calendar-outline" size={30} color="white" />
            <Text style={styles.buttonText}>Manage Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToAnalytics}>
            <Ionicons name="ios-analytics-outline" size={30} color="white" />
            <Text style={styles.buttonText}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={goToCustomerFeedback}
          >
            <Ionicons
              name="ios-chatbox-ellipses-outline"
              size={30}
              color="white"
            />
            <Text style={styles.buttonText}>Customer Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToAccountSettings}>
            <Ionicons name="ios-settings-outline" size={30} color="white" />
            <Text style={styles.buttonText}>Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToNotifications}>
            <Ionicons
              name="ios-notifications-outline"
              size={30}
              color="white"
            />
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToHelpAndSupport}>
            <Ionicons name="ios-help-circle-outline" size={30} color="white" />
            <Text style={styles.buttonText}>Help & Support</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={images.booking} style={styles.image} />
          <Text style={styles.text}>
            You have not create any playLand yet. Click the button below to
            create
          </Text>
          <Button
            mode="contained-tonal"
            onPress={() => navigation.navigate("PlaylandName")}
          >
            <Text style={styles.buttonText}>Click me</Text>
          </Button>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...FONTS.body2,
    marginVertical: 20,
    textAlign: "center",
  },
  buttonText: {
    ...FONTS.h2,
  },
  image: {
    width: "100%",
    height: 400,
    marginBottom: 20,
  },
});
