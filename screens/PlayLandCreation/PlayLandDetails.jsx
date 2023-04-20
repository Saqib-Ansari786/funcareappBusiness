import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Button, TextInput } from "react-native-paper";
import { Image } from "react-native";
import { images, COLORS, FONTS, SIZES, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";

export default function PlaylandDescription() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={images.playground} style={styles.image} />

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
        label={"Price"}
        placeholder="Enter your playland price"
        style={styles.textInput}
      />
      <TextInput
        mode="outlined"
        label={"Any Discount"}
        placeholder="Enter your playland Discount"
        style={styles.textInput}
      />
      <TextInput
        mode="outlined"
        label={"Timings"}
        placeholder="Enter your playland Timings"
        style={styles.textInput}
      />
      <TextInput
        mode="outlined"
        label={"Description"}
        placeholder="Enter your playland Description"
        style={[styles.textInput, { height: SIZES.height * 0.2 }]}
        multiline
        numberOfLines={4}
      />

      <Button
        mode="contained-tonal"
        icon={"chevron-right"}
        onPress={() => navigation.navigate("PlaylandImage")}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </Button>
    </ScrollView>
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
