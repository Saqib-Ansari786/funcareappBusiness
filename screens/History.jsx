import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { FONTS } from "../constants";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function History() {
  const [bookedPlaylands, setbookedPlaylands] = useState([1, 2]);
  const { landdata } = useSelector((state) => state.landdata);
  // const playlandId = landdata[0]._id;
  let playlandId = "64633f362f124b47539cc492";

  useEffect(() => {
    async function getbookedPlaylands() {
      try {
        const response = await fetch(
          `http://starter-express-api-git-main-salman36.vercel.app/api/auth/booked/playland/${playlandId}`
        );
        const data = await response.json();
        setbookedPlaylands(data.bookedplayland);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getbookedPlaylands();
  }, []);
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <MaterialCommunityIcons
        name="book"
        size={24}
        color="#ffcc00"
        style={styles.icon}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.playlandName}>The Fun Zone</Text>
        <Text style={styles.bookingStatus}>
          Booking Status: {item.bookingstatus}
        </Text>
        <Text style={styles.amount}>Amount: ${item.amount}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {bookedPlaylands.length > 0 ? (
        <FlatList
          data={bookedPlaylands}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.text}>No history available</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  listContainer: {
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  playlandName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookingStatus: {
    fontSize: 14,
    color: "#888",
  },
  amount: {
    fontSize: 14,
  },
});
