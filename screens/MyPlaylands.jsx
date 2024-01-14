import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import { COLORS, FONTS, SIZES, images } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";

const PlaylandScreen = () => {
  const navigation = useNavigation();
  const { landdata } = useSelector((state) => state.landdata);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const playland = landdata[0];
  console.log(playland);

  const deletePlayland = async () => {
    console.log(playland._id);
    try {
      setLoading(true);
      const response = await fetch(
        `https://funcare-backend.vercel.app/api/auth/playlanduser/delete/${playland._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      console.log(data);
      if (data?.message === "success") {
        alert("Playland Deleted Successfully");
        dispatch({ type: "SET_PLAYLAND_DELETE", payload: true });
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {landdata.length > 0 ? (
        <>
          <View style={styles.tab}>
            <Avatar.Image
              style={styles.avatar}
              size={50}
              source={{ uri: playland.image }}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{playland.playland_name}</Text>
              <Button
                style={styles.editButton}
                mode="contained"
                onPress={() => {
                  navigation.navigate("Editplayland", {
                    playland: playland,
                  });
                }}
              >
                Edit
              </Button>
            </View>
          </View>
          <ScrollView style={styles.content}>
            <View style={styles.details}>
              <Text
                style={[
                  styles.description,
                  playland?.status === false
                    ? { color: "red" }
                    : { color: "green" },
                ]}
              >
                {playland?.status === false
                  ? "Your Playland is not verified yet By Admin"
                  : "Your Playland is verified By Admin"}
              </Text>
              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Earnings:</Text>
                <Text style={styles.detailValue}>Rs. 0</Text>
              </View>

              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Morning Timing:</Text>
                <Text style={styles.detailValue}>
                  {playland.timing1.timing}
                </Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Afternoon Timing:</Text>
                <Text style={styles.detailValue}>
                  {playland.timing2.timing}
                </Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Evening Timing:</Text>
                <Text style={styles.detailValue}>
                  {playland.timing3.timing}
                </Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Location:</Text>
                <Text style={styles.detailValue}>{playland.location}</Text>
              </View>
              {playland.packages.map((item, index) => (
                <View style={styles.detail} key={index}>
                  <Text style={styles.detailLabel}>{item.package_name}</Text>
                  <Text style={styles.detailValue}>{item.price}</Text>
                </View>
              ))}
            </View>
            <Button
              style={styles.deleteButton}
              mode="contained"
              onPress={deletePlayland}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                "Delete"
              )}
            </Button>
          </ScrollView>
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", ...FONTS.h1 }}>
            You have not added any playland yet
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("PlaylandName")}
            style={styles.button}
          >
            <Text
              style={{
                textAlign: "center",
                ...FONTS.body2,
                color: COLORS.white,
              }}
            >
              Add Playland
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    marginRight: 5,
    borderRadius: 30,
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  editButton: {
    backgroundColor: "#FBC02D",
    borderRadius: 20,
  },
  content: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 20,
    textAlign: "center",
  },
  details: {
    marginBottom: 20,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderRadius: 10,
  },
  detailLabel: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 20,
    color: "#757575",
  },
  detailValue: {
    flex: 3,
    fontSize: 18,
    textAlign: "right",
    color: "#424242",
  },
  button: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: SIZES.radius,
    margin: SIZES.radius,
    borderRadius: SIZES.radius,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    borderRadius: 20,
    marginLeft: 5,
  },
});

export default PlaylandScreen;
