import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { icons, COLORS } from "../constants";
import Home from "../screens/Home";
import MyPlaylands from "../screens/MyPlaylands";
import History from "../screens/History";
import User from "../screens/User";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.primary : COLORS.gray;

          switch (route.name) {
            case "HomeScreen":
              return (
                <Image
                  source={icons.home}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
            case "MyPlayLands":
              return (
                <Image
                  source={icons.play}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 50,
                    height: 50,
                  }}
                />
              );
            case "History":
              return (
                <Image
                  source={icons.bookmark}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
            case "User":
              return (
                <Image
                  source={icons.user}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={Home} />
      <Tab.Screen name="MyPlayLands" component={MyPlaylands} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
};

export default Tabs;
