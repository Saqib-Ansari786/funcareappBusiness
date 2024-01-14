import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Button, TextInput as PaperTextInput } from "react-native-paper";
import { Image } from "react-native";
import { images, COLORS, FONTS, SIZES, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { FontAwesome5 } from "@expo/vector-icons";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

const initialValues = { name: "" };

const TextInput = ({
  label,
  mode,
  onChangeText,
  value,
  error,
  touched,
  ...props
}) => (
  <PaperTextInput
    label={label}
    mode={mode}
    onChangeText={onChangeText}
    value={value}
    error={error}
    onBlur={() => touched && props.onBlur()}
    style={styles.textInput}
    {...props}
  />
);

export default function PlaylandName() {
  const navigation = useNavigation();
  const [playlandName, setPlaylandName] = React.useState("");
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch({ type: "SET_PLAYLAND_NAME", payload: values.name });
    navigation.navigate("Playlandlocation");
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      </View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <Text style={styles.text}>What is your Playland Name?</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="user-circle" size={34} color="grey" />
              <TextInput
                label="Playland Name"
                mode="outlined"
                onChangeText={handleChange("name")}
                value={values.name}
                error={touched.name && errors.name}
                touched={touched.name}
                onBlur={handleBlur("name")}
              />
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
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
    height: "100%",
    position: "absolute",
    opacity: 0.5,
  },

  textInput: {
    height: SIZES.height * 0.06,
    width: SIZES.width * 0.8,
    margin: SIZES.radius,
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: SIZES.radius * 0.7,
    margin: SIZES.radius,
    borderRadius: SIZES.radius,
    width: SIZES.width * 0.4,
  },
});
