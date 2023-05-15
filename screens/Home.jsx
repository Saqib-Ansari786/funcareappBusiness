import { ScrollView, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Button } from "react-native-paper";
import { COLORS, FONTS, images } from "../constants";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function Home() {
  const navigation = useNavigation();
  const [playlands, setPlaylands] = useState([]);
  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    async function getPlaylands() {
      try {
        const response = await fetch(
          "http://starter-express-api-git-main-salman36.vercel.app/api/auth/user/playland",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_firebase_id: userId,
            }),
          }
        );
        const data = await response.json();
        setPlaylands(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getPlaylands();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...FONTS.body2,
    marginVertical: 20,
    textAlign: "center",
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
