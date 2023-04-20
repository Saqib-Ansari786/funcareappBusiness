import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { Image } from "react-native";
import { images, COLORS, FONTS, SIZES, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-maps";

export default function Playlandlocation() {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const handleToggle = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const dropdownStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200],
    }),
  };

  return (
    <View style={styles.container}>
      <Image source={images.location} style={styles.image} />

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
        label={"Playland Location"}
        placeholder="Enter your playland location"
        style={styles.textInput}
      />

      <Button
        mode="contained-tonal"
        icon={"chevron-right"}
        onPress={() => navigation.navigate("PlaylandDescription")}
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
