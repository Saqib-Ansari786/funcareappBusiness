import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { firebaseConfig } from "../firebase";
import firebase from "firebase/compat/app";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { phone, verification } from "../constants/images";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "react-native-modal";

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

const SignUpScreen = ({ navigation }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [countryCode, setCountryCode] = useState("+92");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const sendVerificationCode = (phoneNumber) => {
    console.log(phoneNumber);
    setIsLoading(true); // start loading
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(countryCode + phoneNumber, recaptchaVerifier.current)
      .then((id) => {
        setVerificationId(id);
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorMessage("Invalid Phone number! Please Try Again");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false); // end loading
      });
  };

  const verifyCode = () => {
    setIsLoading(true); // start loading
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(async (result) => {
        setVerificationCode("");
        setErrorMessage(null);
        console.log(result);
        await AsyncStorage.setItem("authId", result.user.uid); // Save the authentication ID to storage
        dispatch({ type: "SET_USER_ID", payload: result.user.uid });
        const data = {
          firebase_id: result.user.uid,
          name: "Salman",
          email: `salman${Number(result.user.phoneNumber)}@gmail.com`,
          phone: Number(result.user.phoneNumber),
          latitude: 24.8607,
          longitude: 67.0011,
          image: "salmanimage",
        };
        try {
          const response = await fetch(
            "http://starter-express-api-git-main-salman36.vercel.app/api/auth/businessuser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          const json = await response.json();
          console.log(json);
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
            gotoUserProfile();
          }, 3000);
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        setErrorMessage("Invalid OTP Code! Please write Right Code...");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false); // end loading
      });
  };

  function gotoUserProfile() {
    navigation.navigate("Home");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : !verificationId ? (
        <Formik
          initialValues={{ phoneNumber: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Handle form submission here
            sendVerificationCode(values.phoneNumber);
          }}
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
              <Image source={phone} style={styles.image} />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    borderColor: COLORS.secondary,
                    fontWeight: "bold",
                    marginLeft: 10,
                    fontSize: SIZES.h3,
                    marginTop: SIZES.radius,
                  }}
                >
                  {countryCode}
                </Text>
                <TextInput
                  placeholder="Enter phone number"
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  style={styles.textInput}
                  keyboardType="phone-pad"
                  autoCompleteType="tel"
                />
              </View>

              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={{ color: "red" }}>{errors.phoneNumber}</Text>
              )}

              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.text}>Generate OTP</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      ) : (
        <>
          <Image
            source={verification}
            style={styles.image}
            resizeMode="cover"
          />
          <TextInput
            placeholder="Enter verification code"
            value={verificationCode}
            onChangeText={(text) => setVerificationCode(text)}
            style={styles.textInput}
            keyboardType="number-pad"
          />
          <TouchableOpacity onPress={verifyCode} style={styles.button}>
            <Text style={styles.text}>Verify Code</Text>
          </TouchableOpacity>
        </>
      )}
      {errorMessage && (
        <Text style={{ color: "red", margin: SIZES.font }}>{errorMessage}</Text>
      )}
      {/* Payment done modal */}
      <Modal isVisible={showModal}>
        <View style={styles.modalContainer}>
          <Image source={icons.tick} style={styles.modalIcon} />
          <Text style={styles.modalText}>
            Verification Done! You're now signed in.
          </Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  textInput: {
    height: SIZES.height * 0.07,
    width: SIZES.width * 0.8,
    borderColor: COLORS.secondary,
    borderBottomWidth: 1,
    padding: SIZES.radius,
    margin: SIZES.radius,
    borderRadius: SIZES.radius,
    fontSize: SIZES.h3,
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: SIZES.radius,
    margin: SIZES.radius,
    borderRadius: SIZES.radius,
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    marginBottom: 20,
  },
  text: {
    ...FONTS.h2,
    color: COLORS.white,
    letterSpacing: 3,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: SIZES.radius,
    alignItems: "center",
    alignSelf: "center",
    width: 350,
    height: 300,
  },
  modalText: {
    ...FONTS.h2,
    color: COLORS.black,
    letterSpacing: 3,
    textAlign: "center",
  },
  modalIcon: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});
