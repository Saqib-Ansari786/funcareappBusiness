import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { images } from "../constants";

const PlaylandScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        <Avatar.Image
          style={styles.avatar}
          size={70}
          source={images.playground}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>The Fun Zone</Text>
          <Button
            style={styles.editButton}
            mode="contained"
            onPress={() => console.log("Edit button pressed")}
          >
            Edit
          </Button>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          venenatis, lectus non molestie blandit, purus justo finibus magna,
          eget lobortis ex sapien ac velit.
        </Text>
        <View style={styles.details}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Earnings:</Text>
            <Text style={styles.detailValue}>$1,000</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Timings:</Text>
            <Text style={styles.detailValue}>10am - 8pm</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Price:</Text>
            <Text style={styles.detailValue}>$10 per hour</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Discount:</Text>
            <Text style={styles.detailValue}>10% off on weekdays</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>123 Main Street</Text>
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
      </View>
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
    marginRight: 20,
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
  },
  editButton: {
    marginLeft: 20,
    backgroundColor: "#FBC02D",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 18,
    marginBottom: 30,
    lineHeight: 28,
  },
  details: {
    marginBottom: 20,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 20,
    color: "#757575",
  },
  detailValue: {
    fontSize: 18,
  },
});

export default PlaylandScreen;
