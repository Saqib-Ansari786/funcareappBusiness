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
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";

export default function PlaylandDescription() {
  const navigation = useNavigation();
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const dispatch = useDispatch();

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
      </View>
      <Text style={{ ...FONTS.h2 }}>Enter Playland Details</Text>
      <Formik
        initialValues={{ price: "", discount: "", description: "" }}
        onSubmit={(values) => {
          dispatch({ type: "SET_PRICE", payload: values.price });
          dispatch({ type: "SET_DISCOUNT", payload: values.discount });
          dispatch({ type: "SET_DESCRIPTION", payload: values.description });
          dispatch({
            type: "SET_TIME_OPEN",
            payload: startTime.toLocaleTimeString(),
          });
          dispatch({
            type: "SET_TIME_CLOSE",
            payload: endTime.toLocaleTimeString(),
          });
          navigation.navigate("PlaylandImage");
        }}
        validationSchema={Yup.object().shape({
          price: Yup.number().required("Price is required").min(0).max(10000),
          discount: Yup.number()
            .required("Discount is required")
            .min(0)
            .max(100),
          description: Yup.string().required("Description is required"),
        })}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="pricetags-outline" size={24} color="black" />
              <TextInput
                mode="outlined"
                label={"Price"}
                placeholder="Enter Price"
                style={styles.textInput}
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                value={values.price}
                error={errors.price && touched.price}
                keyboardType="numeric"
              />
            </View>
            {errors.price && touched.price && (
              <Text style={styles.error}>{errors.price}</Text>
            )}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="pricetags-outline" size={24} color="black" />
              <TextInput
                mode="outlined"
                label={"Any Discount"}
                placeholder="Enter Discount"
                style={styles.textInput}
                onChangeText={handleChange("discount")}
                onBlur={handleBlur("discount")}
                value={values.discount}
                error={errors.discount && touched.discount}
                keyboardType="numeric"
              />
            </View>
            {errors.discount && touched.discount && (
              <Text style={styles.error}>{errors.discount}</Text>
            )}

            <Text
              style={{ ...FONTS.h3, alignSelf: "flex-start", marginLeft: 35 }}
            >
              Set Start Time:
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="time-outline" size={24} color="black" />
              <Button
                mode="outlined"
                onPress={handleStart}
                style={styles.textInput}
              >
                {timeError ? (
                  <Text style={styles.error}>
                    Please select time between 10:00 AM to 10:00 PM
                  </Text>
                ) : (
                  <Text style={{ ...FONTS.body2 }}>
                    {startTime && startTime.toLocaleTimeString()}
                  </Text>
                )}
              </Button>
            </View>
            {showStartTimePicker && (
              <RNDateTimePicker
                testID="timePicker"
                value={startTime}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    const selectedTime = new Date(selectedDate);
                    const morningTime = new Date(selectedDate);
                    morningTime.setHours(10, 0, 0, 0);
                    const eveningTime = new Date(selectedDate);
                    eveningTime.setHours(22, 0, 0, 0);

                    if (
                      selectedTime >= morningTime &&
                      selectedTime <= eveningTime
                    ) {
                      setShowStartTimePicker(false);
                      setStartTime(selectedDate);
                      setTimeError(false);
                    } else {
                      // Display an error message or handle the invalid time selection
                      setTimeError(true);
                    }
                  }
                }}
              />
            )}
            <Text
              style={{ ...FONTS.h3, alignSelf: "flex-start", marginLeft: 35 }}
            >
              Set End Time:
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="time-outline" size={24} color="black" />
              <Button
                mode="outlined"
                onPress={handleEnd}
                style={styles.textInput}
              >
                {timeError ? (
                  <Text style={styles.error}>
                    Please select time between 10:00 AM to 10:00 PM
                  </Text>
                ) : (
                  <Text style={{ ...FONTS.body2 }}>
                    {endTime && endTime.toLocaleTimeString()}
                  </Text>
                )}
              </Button>
            </View>
            {showEndTimePicker && (
              <RNDateTimePicker
                testID="timePicker"
                value={endTime}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    const selectedTime = new Date(selectedDate);
                    const morningTime = new Date(selectedDate);
                    morningTime.setHours(10, 0, 0, 0);
                    const eveningTime = new Date(selectedDate);
                    eveningTime.setHours(22, 0, 0, 0);

                    if (
                      selectedTime >= morningTime &&
                      selectedTime <= eveningTime
                    ) {
                      setShowEndTimePicker(false);
                      setEndTime(selectedDate);
                      setTimeError(false);
                    } else {
                      // Display an error message or handle the invalid time selection
                      setTimeError(true);
                    }
                  }
                }}
              />
            )}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="create-outline" size={24} color="black" />
              <TextInput
                mode="outlined"
                label={"Description"}
                placeholder="Enter your playland Description"
                style={[styles.textInput, { height: SIZES.height * 0.2 }]}
                multiline
                numberOfLines={4}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                error={errors.description && touched.description}
              />
            </View>
            {errors.description && touched.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
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
    color: COLORS.white,
    letterSpacing: 1,
  },
  image: {
    width: "100%",
    height: 500,
    marginBottom: 20,
  },

  textInput: {
    height: SIZES.height * 0.07,
    width: SIZES.width * 0.8,
    margin: SIZES.radius,
  },
  error: {
    color: "red",
    marginLeft: 35,
    ...FONTS.body4,
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: SIZES.radius * 0.7,
    margin: SIZES.radius,
    borderRadius: SIZES.radius,
    width: SIZES.width * 0.6,
    alignSelf: "center",
  },
});
