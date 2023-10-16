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
import { Cloudinary } from "@cloudinary/url-gen/index";

export default function PlaylandImage({ navigation }) {
  const [avatarUrl, setAvatarUrl] = useState(
    "https://randomuser.me/api/portraits/men/1.jpg"
  );
  const [image, setImage] = useState({});
  const dispatch = useDispatch();
  const playLandData = useSelector((state) => state.playland);
  const cld = new Cloudinary({ cloud: { cloudName: "dj4jj7sog" } });

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
      console.log(result);

      await imageUpload({
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: result.assets[0].uri.split("/")[
          result.assets[0].uri.split("/").length - 1
        ],
      });
    }
  };

  async function imageUpload(image) {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "funcare_images");
    data.append("cloud_name", "dj4jj7sog");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dj4jj7sog/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      console.log(res);
      setAvatarUrl(res.secure_url);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSave() {
    dispatch({ type: "SET_IMAGE", payload: avatarUrl });
    const finaldata = {
      ...playLandData,
      image: avatarUrl,
    };
    console.log(finaldata);

    const convertToBase64 = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

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
