import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { COLORS, FONTS, images } from "../constants";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={images.booking} style={styles.image} />
      <Text style={styles.text}>
        You have not create any playLand yet. Click the button below to create
      </Text>
      <Button
        mode="contained-tonal"
        onPress={() => navigation.navigate("PlaylandName")}
      >
        <Text style={styles.buttonText}>Click me</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...FONTS.h2,
    marginVertical: 20,
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
