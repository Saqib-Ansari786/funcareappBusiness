import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

export default function History() {
  const [bookedPlaylands, setbookedPlaylands] = useState([]);
  const { landdata } = useSelector((state) => state.landdata);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getbookedPlaylands() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://funcare-backend.vercel.app/api/auth/booked/playland/${landdata[0]._id}`
        );
        const data = await response.json();
        setbookedPlaylands(data.bookedplayland);
        dispatch({ type: "SET_BOOKING_DATA", payload: data.bookedplayland });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
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
        <Text style={styles.playlandName}>{landdata[0].playland_name}</Text>
        <Text style={styles.bookingStatus}>
          Booking Status: {item.bookingstatus}
        </Text>
        <Text style={styles.bookingStatus}>Payment Method: {item.method}</Text>
        <Text style={styles.amount}>Amount: ${item.amount}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <>
          <Text style={styles.header}>Booking History</Text>

          {bookedPlaylands ? (
            <FlatList
              data={bookedPlaylands}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <Text style={styles.text}>No history available</Text>
          )}
        </>
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
  header: {
    ...FONTS.h1,
    marginBottom: 20,
  },
  listContainer: {
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 10,
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
