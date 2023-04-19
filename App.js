import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { COLORS, SIZES, FONTS, icons } from "./constants";
import Tabs from "./navigation/tabs";
import SignUpScreen from "./screens/SignUpScreen";
import { Provider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import Onboarding1 from "./screens/Onboarding/Onboarding1";
import Onboarding2 from "./screens/Onboarding/Onboarding2";
import PlaylandName from "./screens/PlayLandCreation/PlaylandName";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

export default function App() {
  const [route, setRoute] = useState("onboarding1");
  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  const checkIfLoggedIn = async () => {
    const authId = await AsyncStorage.getItem("authId");
    if (authId) {
      // User is already authenticated, navigate to home screen
      setRoute("Home");
    } else {
      // User is not authenticated, navigate to sign up screen
      setRoute("Onboarding1");
    }
  };

  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  const Stack = createStackNavigator();

  return (
    <Provider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName={route}>
          {/* Screens */}
          {/* <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              title: null,
              headerShown: false,
            }}
          /> */}

          <Stack.Screen
            name="PlaylandName"
            component={PlaylandName}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Onboarding1"
            component={Onboarding1}
            options={{
              title: null,
              headerStyle: {
                backgroundColor: COLORS.white,
              },
            }}
          />
          <Stack.Screen
            name="Onboarding2"
            component={Onboarding2}
            options={{
              title: null,
              headerStyle: {
                backgroundColor: COLORS.white,
              },
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignUpScreen}
            options={{
              title: null,
              headerStyle: {
                backgroundColor: COLORS.white,
              },
            }}
          />

          {/* <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{
              title: null,
              headerShown: false,
            }}
          /> */}
          {/* <Stack.Screen
            name="MapLocation"
            component={MapLocation}
            options={{
              title: null,
              headerShown: false,
            }}
          /> */}

          {/* Tabs */}
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{
              title: null,
              headerStyle: {
                backgroundColor: COLORS.white,
              },
              headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: SIZES.padding }}>
                  <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: SIZES.padding }}
                  onPress={() => console.log("Menu")}
                >
                  <Image
                    source={icons.menu}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </TouchableOpacity>
              ),
              headerTitle: () => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Image
                    source={icons.main}
                    resizeMode="cover"
                    style={{
                      width: 200,
                      height: 200,
                    }}
                  />
                </View>
              ),
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },

  button: {
    backgroundColor: "red",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
