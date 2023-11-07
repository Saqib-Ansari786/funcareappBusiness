import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  ImageBackground,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, SIZES } from "../../constants";
import Header from "../../components/Header";

const backgroundImage =
  "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Replace with your background image

export default function PlaylandDescription({ navigation }) {
  const dispatch = useDispatch();
  const existingPackages = useSelector(
    (state) => state.playland.existingPackages
  );
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [check_package, setCheck_package] = useState(null);

  const handleEditPackage = (selectpackage) => {
    setSelectedPackage(selectpackage);
    setCheck_package(selectpackage);
  };

  const handleSavePackage = (values) => {
    if (check_package) {
      // Edit existing package

      const updatedPackages = existingPackages.map((item) => {
        if (item === check_package) {
          item = selectedPackage;
          return item;
        }
        return item;
      });

      console.log("updatedPackages", updatedPackages);
      dispatch({ type: "SET_PACKAGES", payload: updatedPackages });
    } else {
      // Add a new package
      console.log("new package:", selectedPackage);
      dispatch({
        type: "SET_PACKAGES",
        payload: [...existingPackages, selectedPackage],
      });
    }
    setSelectedPackage(null);
    setCheck_package(null);
  };

  return (
    <ImageBackground source={{ uri: backgroundImage }} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <Text style={styles.heading}>Add/Edit Playland Packages</Text>
        <View style={styles.formContainer}>
          <TextInput
            mode="outlined"
            label="Package Name"
            placeholder="Enter Package Name"
            style={styles.textInput}
            value={selectedPackage ? selectedPackage.package_name : ""}
            onChangeText={(text) =>
              setSelectedPackage({ ...selectedPackage, package_name: text })
            }
          />

          <TextInput
            mode="outlined"
            label="Price"
            placeholder="Enter Price"
            style={styles.textInput}
            value={selectedPackage ? selectedPackage.price : ""}
            onChangeText={(text) =>
              setSelectedPackage({ ...selectedPackage, price: text })
            }
            keyboardType="numeric"
          />

          <TextInput
            mode="outlined"
            label="Any Discount"
            placeholder="Enter Discount"
            style={styles.textInput}
            value={selectedPackage ? selectedPackage.discount : ""}
            onChangeText={(text) =>
              setSelectedPackage({ ...selectedPackage, discount: text })
            }
            keyboardType="numeric"
          />

          <TextInput
            mode="outlined"
            label="Description"
            placeholder="Enter your playland Description"
            style={[styles.textInput, { height: 120 }]}
            value={selectedPackage ? selectedPackage.discription : ""}
            onChangeText={(text) =>
              setSelectedPackage({ ...selectedPackage, discription: text })
            }
            multiline={true}
          />

          <Button
            onPress={() => handleSavePackage(selectedPackage)}
            title="Save Package"
          />
        </View>
        <View>
          {existingPackages.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleEditPackage(item)}
              style={styles.packageCard}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Name: {item.package_name}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Price: {item.price}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Discount: {item.discount}
              </Text>
              <Text>Description: {item.discription}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("PlaylandTimings")}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 100,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    width: "100%",
    marginVertical: 10,
  },
  packageCard: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  nextButton: {
    backgroundColor: COLORS.black,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 300,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: SIZES.h2,
  },
});
