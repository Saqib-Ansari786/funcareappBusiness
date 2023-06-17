import React, { useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { COLORS, SIZES, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const PlaylandConfirmation = () => {
  const navigation = useNavigation();
  const playland = useSelector((state) => state.playland);
  const userID = useSelector((state) => state.user.userId);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  async function createPlayland() {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://starter-express-api-git-main-salman36.vercel.app/api/auth/create/playlanduser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            playland_name: playland.playland_name,
            location: playland.location,
            discription: playland.discription,
            price: playland.price,
            discount: playland.discount,
            time_open: playland.time_open,
            time_close: playland.time_close,
            user_firebase_id: userID,
            path_url: playland.image,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch({ type: "SET_PLAYLAND_CREATE", payload: true });
      setIsLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  }

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
              navigation.goBack();
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
      <Text style={styles.title}>Playland Confirmation</Text>
      <TextInput
        label="Playland Name"
        value={playland.playland_name}
        editable={false}
        style={styles.input}
      />
      <TextInput
        label="Location Map Link"
        value={playland.location}
        editable={false}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={playland.discription}
        editable={false}
        multiline={true}
        style={styles.input}
      />
      <TextInput
        label="Price"
        value={playland.price}
        editable={false}
        style={styles.input}
      />
      <TextInput
        label="Discount"
        value={playland.discount}
        editable={false}
        style={styles.input}
      />
      <TextInput
        label="Start Time"
        value={playland.time_open}
        editable={false}
        style={styles.input}
      />
      <TextInput
        label="End Time"
        value={playland.time_close}
        editable={false}
        style={styles.input}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <Button mode="contained" style={styles.button} onPress={createPlayland}>
          Submit
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 70,
  },
  input: {
    marginVertical: 8,
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: SIZES.radius * 0.4,
    margin: SIZES.radius,
    borderRadius: SIZES.radius,
    width: SIZES.width * 0.5,
    alignSelf: "center",
  },
});

export default PlaylandConfirmation;
