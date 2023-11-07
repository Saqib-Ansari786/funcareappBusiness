import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, SIZES } from "../../constants";

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Playland Packages
      </Text>
      <View>
        <TextInput
          mode="outlined"
          label={"Package Name"}
          placeholder="Enter Package Name"
          style={styles.textInput}
          value={selectedPackage ? selectedPackage.package_name : ""}
          onChangeText={(text) =>
            setSelectedPackage({ ...selectedPackage, package_name: text })
          }
        />

        <TextInput
          mode="outlined"
          label={"Price"}
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
          label={"Any Discount"}
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
          label={"Description"}
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
            style={{
              backgroundColor: "#fff",
              padding: 20,
              marginVertical: 8,
              marginHorizontal: 16,
            }}
          >
            <Text>Name: {item.package_name}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Discount: {item.discount}</Text>
            <Text>Description: {item.discription}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.black,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          marginVertical: 8,
          marginHorizontal: 16,
          width: 300,
        }}
        onPress={() => navigation.navigate("PlaylandTimings")}
      >
        <Text style={{ color: COLORS.white, fontSize: SIZES.h2 }}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
    paddingVertical: 30,
    padingHorizontal: 10,
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 10,
  },
});
