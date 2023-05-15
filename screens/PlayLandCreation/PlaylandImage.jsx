import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, IconButton, TextInput } from "react-native-paper";
import { COLORS, FONTS, SIZES } from "../../constants";
import { useDispatch, useSelector } from "react-redux";

export default function PlaylandImage({ navigation }) {
  const [avatarUrl, setAvatarUrl] = useState(
    "https://randomuser.me/api/portraits/men/1.jpg"
  );
  const dispatch = useDispatch();
  const playLandData = useSelector((state) => state.playland);

  const handlePickImage = async () => {
    let permissionResult;
    if (Platform.OS === "ios") {
      permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    if (permissionResult && permissionResult.status !== "granted") {
      alert("You need to grant permission to access your photo gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setAvatarUrl(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  async function handleSave() {
    dispatch({ type: "SET_IMAGE", payload: avatarUrl });
    const finaldata = {
      ...playLandData,
      image: avatarUrl,
    };
    console.log(finaldata);

    // try {
    //   const response = await fetch(
    //     "http://starter-express-api-git-main-salman36.vercel.app/api/auth/create/playlanduser",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(finaldata),
    //     }
    //   );
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }

    navigation.navigate("PlaylandConfirmation");
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={handlePickImage}
      >
        <Image style={styles.avatar} source={{ uri: avatarUrl }} />
        <IconButton icon="camera" size={30} color={COLORS.primary} />
        <Text style={styles.changeAvatar}>Update Playland Image</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignSelf: "flex-start",
          width: "100%",
          paddingHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Home")}
          buttonColor="orange"
        >
          <Text style={styles.buttonText}>Skip</Text>
        </Button>
        <Button mode="contained" onPress={handleSave}>
          <Text style={styles.buttonText}>Submit</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: SIZES.width * 0.9,
    height: 400,
    borderRadius: 60,
    marginBottom: 10,
  },
  changeAvatar: {
    fontSize: 18,
    color: COLORS.primary,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.radius,
    borderRadius: SIZES.radius,
    marginVertical: SIZES.padding,
  },
  buttonText: {
    color: "#ffffff",
    ...FONTS.h3,
    letterSpacing: 1,
  },
});
