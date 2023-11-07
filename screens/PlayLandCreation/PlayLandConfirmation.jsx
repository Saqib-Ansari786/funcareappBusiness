import React, { useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, Card } from "react-native-paper";
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

      let uploadData = {
        playland_name: playland.playland_name,
        location: playland.location,
        user_id: userID,
        image: playland.image,
        packages: playland.existingPackages,
        timing1: {
          timing: `${playland.timings[0].start} - ${playland.timings[0].end}`,
          seats: playland.timings[0].seats,
        },
        timing2: {
          timing: `${playland.timings[1].start} - ${playland.timings[1].end}`,
          seats: playland.timings[1].seats,
        },
        timing3: {
          timing: `${playland.timings[2].start} - ${playland.timings[2].end}`,
          seats: playland.timings[2].seats,
        },
      };
      console.log(uploadData);
      const response = await fetch(
        "https://funcare-backend.vercel.app/api/auth/create/playlanduser",
        {
          method: "POST",
          body: JSON.stringify(uploadData),
          headers: {
            "Content-Type": "application/json",
          },
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.title}>Playland Confirmation</Text>
      </View>

      <View style={styles.dataContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Playland Name</Text>
            <Text style={styles.cardText}>{playland.playland_name}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Location Map Link</Text>
            <Text style={styles.cardText}>{playland.location}</Text>
          </Card.Content>
        </Card>
        {playland.timings.map((item, index) => {
          return (
            <Card style={styles.card} key={index}>
              <Card.Content>
                <Text style={styles.cardTitle}>{item.period} Timings</Text>

                <Text style={styles.cardText}>
                  {item.start} - {item.end}
                </Text>
                <Text style={styles.cardText}>No of seats: {item.seats}</Text>
              </Card.Content>
            </Card>
          );
        })}
        {playland.existingPackages.map((item, index) => {
          return (
            <Card style={styles.card} key={index}>
              <Card.Content>
                <Text style={styles.cardTitle}>{item.package_name}</Text>
                <Text style={styles.cardText}>Price: {item.price}</Text>
              </Card.Content>
            </Card>
          );
        })}
      </View>

      <View style={styles.footer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <Button
            mode="contained"
            style={styles.button}
            onPress={createPlayland}
          >
            Submit
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray,
    padding: SIZES.padding,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.padding * 2,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: "bold",
    marginLeft: SIZES.padding,
  },
  dataContainer: {
    flexGrow: 1,
    paddingVertical: SIZES.padding,
  },
  card: {
    marginBottom: SIZES.padding,
    elevation: 3,
    backgroundColor: COLORS.white,
  },
  cardTitle: {
    fontSize: SIZES.h3,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  cardText: {
    fontSize: SIZES.body4,
    color: COLORS.gray,
  },
  footer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SIZES.radius * 0.6,
    borderRadius: SIZES.radius,
    width: "50%",
  },
});

export default PlaylandConfirmation;
