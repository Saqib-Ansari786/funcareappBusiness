import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Button, TextInput } from "react-native-paper";
import { Image } from "react-native";
import { images, COLORS, FONTS, SIZES, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

export default function PlaylandName() {
  const navigation = useNavigation();
  const [playlandName, setPlaylandName] = React.useState("");
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Image source={images.name} style={styles.image} resizeMode="stretch" />

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
      <TextInput
        mode="outlined"
        label={"Playland Name"}
        placeholder="Enter your playland name"
        style={styles.textInput}
        onChangeText={(text) => setPlaylandName(text)}
      />

      <Button
        mode="contained-tonal"
        icon={"chevron-right"}
        onPress={() => {
          dispatch({ type: "SET_PLAYLAND_NAME", payload: playlandName });
          navigation.navigate("Playlandlocation");
        }}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    height: 500,
    marginBottom: 20,
  },

  textInput: {
    height: SIZES.height * 0.09,
    width: SIZES.width * 0.8,
    margin: SIZES.radius,
  },
});
