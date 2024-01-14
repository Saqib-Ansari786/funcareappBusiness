import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Header from "../../components/Header";
import { ScrollView } from "react-native";
import { useDispatch } from "react-redux";

const TimingsScreen = ({ navigation }) => {
  const [timings, setTimings] = useState([
    { period: "Morning", start: "10am", end: "1pm", seats: 50 },
    { period: "Afternoon", start: "2pm", end: "5pm", seats: 50 },
    { period: "Night", start: "6pm", end: "10pm", seats: 50 },
  ]);
  const dispatch = useDispatch();

  const handleEdit = (index, field, newValue) => {
    const updatedTimings = [...timings];
    updatedTimings[index][field] = newValue;
    setTimings(updatedTimings);
  };

  const handleSubmit = () => {
    dispatch({ type: "SET_TIMINGS", payload: timings });
    navigation.navigate("PlaylandImage");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/Picture5.jpg")}
      style={styles.container}
      imageStyle={{ opacity: 0.5 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#000",
            marginTop: 100,
          }}
        >
          Select Playland Timings
        </Text>
        <Header />
        {timings.map((timing, index) => (
          <View key={index} style={styles.timingContainer}>
            <Text style={styles.periodText}>{timing.period} Timings</Text>
            <View style={styles.timingRow}>
              <Text style={styles.timingText}>Start Time:</Text>
              <TextInput
                style={styles.input}
                value={timing.start}
                onChangeText={(newValue) =>
                  handleEdit(index, "start", newValue)
                }
              />
            </View>
            <View style={styles.timingRow}>
              <Text style={styles.timingText}>End Time:</Text>
              <TextInput
                style={styles.input}
                value={timing.end}
                onChangeText={(newValue) => handleEdit(index, "end", newValue)}
              />
            </View>
            <View style={styles.timingRow}>
              <Text style={styles.timingText}>Seats:</Text>
              <TextInput
                style={styles.input}
                value={timing.seats.toString()}
                keyboardType="numeric"
                onChangeText={(newSeats) =>
                  handleEdit(index, "seats", newSeats)
                }
              />
            </View>
          </View>
        ))}
        <View style={{ marginTop: 20 }}>
          <Button title="Next" onPress={handleSubmit} color={"black"} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    padding: 10,
  },
  timingContainer: {
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Half-transparent white background
    padding: 15,
    borderRadius: 10,
  },
  timingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  periodText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "blue",
  },
  timingText: {
    fontSize: 18,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 5,
    width: 100,
    borderRadius: 5,
  },
});

export default TimingsScreen;
