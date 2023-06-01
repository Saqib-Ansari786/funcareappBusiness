import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { COLORS, FONTS, SIZES, images } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";

const PlaylandScreen = () => {
  const navigation = useNavigation();
  const { landdata } = useSelector((state) => state.landdata);

  return (
    <View style={styles.container}>
      {landdata.length > 0 ? (
        <>
          <View style={styles.tab}>
            <Avatar.Image
              style={styles.avatar}
              size={60}
              source={images.playground}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {landdata && landdata[0].playland_name}
              </Text>
              <Button
                style={styles.editButton}
                mode="contained"
                onPress={() =>
                  navigation.navigate("Editplayland", {
                    price: "10",
                    discount: "10",
                    packages:
                      "Bumper package: 10 Merry-Go-Round in 20$\nSimple package: 2 Merry-Go-Round in 5$",
                  })
                }
              >
                Edit
              </Button>
            </View>
          </View>
          <ScrollView style={styles.content}>
            <Text style={styles.description}>
              {landdata && landdata[0].discription}
            </Text>
            <View style={styles.details}>
              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Earnings:</Text>
                <Text style={styles.detailValue}>0</Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Timings:</Text>
                <Text style={styles.detailValue}>
                  {landdata && landdata[0].time_open} -{" "}
                  {landdata && landdata[0].time_close}
                </Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Price:</Text>
                <Text style={styles.detailValue}>
                  ${landdata && landdata[0].price} per hour
                </Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Discount:</Text>
                <Text style={styles.detailValue}>
                  {landdata && landdata[0].discount}% off on weekdays
                </Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Location:</Text>
                <Text style={styles.detailValue}>
                  {landdata && landdata[0].location}
                </Text>
              </View>
              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Packages:</Text>
                <Text style={styles.detailValue}>
                  Bumper package: 10 Merry-Go-Round in 20$
                  {"\n"}
                  Simple package: 2 Merry-Go-Round in 5$
                </Text>
              </View>
            </View>
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
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  editButton: {
    backgroundColor: "#FBC02D",
    borderRadius: 20,
    marginLeft: 5,
  },
  content: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 30,
    lineHeight: 28,
    color: "#000",
    textAlign: "justify",
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
});

export default PlaylandScreen;
