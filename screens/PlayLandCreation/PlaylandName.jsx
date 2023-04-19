import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Button, TextInput } from "react-native-paper";
import { Image } from "react-native";
import { images, COLORS, FONTS, SIZES, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";

export default function PlaylandName() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          right: 20,
          //height: 50,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Image
              source={icons.back}
              resizeMode="cover"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => {
              console.log("Menu on pressed");
            }}
          >
            <Image
              source={icons.menu}
              resizeMode="cover"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Image source={images.name} style={styles.image} />
      <TextInput
        mode="outlined"
        label={"Playland Name"}
        placeholder="Enter your playland name"
        style={styles.textInput}
      />

      <Button mode="contained-tonal" icon={"chevron-right"}>
        <Text style={styles.buttonText}>Next</Text>
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

  textInput: {
    height: SIZES.height * 0.09,
    width: SIZES.width * 0.8,
    margin: SIZES.radius,
  },
});
