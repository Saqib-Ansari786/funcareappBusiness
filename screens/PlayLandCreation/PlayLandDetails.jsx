import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { Image } from "react-native";
import { images, COLORS, FONTS, SIZES, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

export default function PlaylandDescription() {
  const navigation = useNavigation();
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleStart = () => {
    setShowStartTimePicker(true);
  };

  const handleEnd = () => {
    setShowEndTimePicker(true);
  };

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
      <Text style={{ ...FONTS.h2 }}>Enter Playland Details</Text>
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
      <Text style={{ ...FONTS.h3, alignSelf: "flex-start", marginLeft: 35 }}>
        Set Start Time:
      </Text>
      <Button mode="outlined" onPress={handleStart} style={styles.textInput}>
        <Text style={styles.buttonText}>
          {startTime && startTime.toLocaleTimeString()}
        </Text>
      </Button>
      {showStartTimePicker && (
        <RNDateTimePicker
          testID="timePicker"
          value={startTime}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartTimePicker(false);
            setStartTime(selectedDate);
          }}
        />
      )}
      <Text style={{ ...FONTS.h3, alignSelf: "flex-start", marginLeft: 35 }}>
        Set End Time:
      </Text>
      <Button mode="outlined" onPress={handleEnd} style={styles.textInput}>
        <Text style={styles.buttonText}>
          {endTime && endTime.toLocaleTimeString()}
        </Text>
      </Button>
      {showEndTimePicker && (
        <RNDateTimePicker
          testID="timePicker"
          value={endTime}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndTimePicker(false);
            setEndTime(selectedDate);
          }}
        />
      )}
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
