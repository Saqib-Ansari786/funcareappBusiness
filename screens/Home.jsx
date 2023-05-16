import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { COLORS, FONTS, images } from "../constants";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

export default function Home() {
  const navigation = useNavigation();
  const [playlands, setPlaylands] = useState([]);
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getPlaylands() {
      try {
        const response = await fetch(
          `http://starter-express-api-git-main-salman36.vercel.app/api/auth/user/playland/${userId}`
        );
        const data = await response.json();
        setPlaylands(data.userPlayland);
        dispatch({ type: "SET_LAND_DATA", payload: data.userPlayland });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(false);
    getPlaylands();
  }, []);

  const goToManagePlaylands = () => {
    navigation.navigate("MyPlayLands");
  };
  const goToManageBookings = () => {
    navigation.navigate("History");
  };
  const goToAccountSettings = () => {
    navigation.navigate("User");
  };

  const goToHelpAndSupport = () => {
    navigation.navigate("Helpfaq");
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : playlands.length > 0 ? (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Dashboard</Text>
          <View style={styles.metric}>
            <Text style={styles.metricText}>Bookings: 1</Text>
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

          <TouchableOpacity style={styles.button} onPress={goToAccountSettings}>
            <Ionicons name="ios-settings-outline" size={30} color="white" />
            <Text style={styles.buttonText}>Account Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={goToHelpAndSupport}>
            <Ionicons name="ios-help-circle-outline" size={30} color="white" />
            <Text style={styles.buttonText}>Help & Support</Text>
          </TouchableOpacity>
        </ScrollView>
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
  header: {
    ...FONTS.h1,
    marginVertical: 20,
  },
  metric: {
    backgroundColor: COLORS.primary,
    width: "80%",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  metricText: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: "80%",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
