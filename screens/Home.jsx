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
  const { bookingdata } = useSelector((state) => state.bookingdata);
  const { playlandcreate, playlandupdate } = useSelector(
    (state) => state.request
  );

  useEffect(() => {
    async function getPlaylands() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://starter-express-api-git-main-salman36.vercel.app/api/auth/user/playland/${userId}`
        );
        const data = await response.json();
        setPlaylands(data.userPlayland);
        dispatch({ type: "SET_LAND_DATA", payload: data.userPlayland });
        dispatch({ type: "SET_PLAYLAND_CREATE", payload: false });
        dispatch({ type: "SET_PLAYLAND_UPDATE", payload: false });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    getPlaylands();
  }, [playlandcreate, playlandupdate]);

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
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : playlands.length > 0 ? (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Dashboard</Text>
          <View style={styles.metric}>
            <Text style={styles.metricText}>
              Bookings: {bookingdata && bookingdata.length}
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricText}>Revenue: $1000</Text>
          </View>
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
          <TouchableOpacity
            style={styles.addbutton}
            onPress={() => navigation.navigate("PlaylandName")}
          >
            <Text style={styles.buttonText}>Click Me</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexGrow: 1,
  },
  text: {
    ...FONTS.body2,
    marginVertical: 20,
    textAlign: "center",
  },
  buttonText: {
    ...FONTS.h2,
    color: COLORS.white,
    marginLeft: 20,
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
  },
  addbutton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    width: "80%",
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
