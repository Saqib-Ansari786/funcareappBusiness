import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FONTS } from "../constants";

export default function History() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No history available</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    ...FONTS.h1,
  },
});
