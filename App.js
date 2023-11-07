import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { COLORS, SIZES, FONTS, icons } from "./constants";
import Tabs from "./navigation/tabs";
import SignUpScreen from "./screens/SignUpScreen";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import Onboarding1 from "./screens/Onboarding/Onboarding1";
import Onboarding2 from "./screens/Onboarding/Onboarding2";
import PlaylandName from "./screens/PlayLandCreation/PlaylandName";
import Playlandlocation from "./screens/PlayLandCreation/Playlandlocation";
import PlaylandDescription from "./screens/PlayLandCreation/PlayLandDetails";
import PlaylandImage from "./screens/PlayLandCreation/PlaylandImage";
import EditDetailScreen from "./screens/Editplayland";
import store from "./store/store";
import PlaylandConfirmation from "./screens/PlayLandCreation/PlayLandConfirmation";
import EditUser from "./screens/EditUser";
import Helpfaq from "./screens/Helpfaq";
import Onboarding3 from "./screens/Onboarding/Onboarding3";
import EmailScreen from "./screens/SignupScreens/EmailScreen";
import VerificationScreen from "./screens/SignupScreens/VerificationScreen";
import UserNameImageScreen from "./screens/SignupScreens/UserNameImageScreen";
import SelectTimingsScreen from "./screens/PlayLandCreation/PlaylandTimings";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

export function Main() {
  const [route, setRoute] = useState("Onboarding3");
  const dispatch = useDispatch();

  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  const checkIfLoggedIn = async () => {
    const authId = await AsyncStorage.getItem("authId");
    if (authId) {
      // User is authenticated, navigate to home screen
      dispatch({ type: "SET_USER_ID", payload: authId });
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
    <PaperProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName={route}
          screenOptions={() => ({
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
            headerStyle: {
              backgroundColor: COLORS.black,
            },
            headerTintColor: COLORS.white,
          })}
        >
          {/* Screens */}
          <Stack.Screen
            name="Helpfaq"
            component={Helpfaq}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditUser"
            component={EditUser}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PlaylandConfirmation"
            component={PlaylandConfirmation}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Editplayland"
            component={EditDetailScreen}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PlaylandImage"
            component={PlaylandImage}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PlaylandDescription"
            component={PlaylandDescription}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Playlandlocation"
            component={Playlandlocation}
            options={{
              title: null,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="PlaylandName"
            component={PlaylandName}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PlaylandTimings"
            component={SelectTimingsScreen}
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
                backgroundColor: COLORS.black,
              },
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="Onboarding2"
            component={Onboarding2}
            options={{
              title: null,
              headerStyle: {
                backgroundColor: COLORS.black,
              },
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="Onboarding3"
            component={Onboarding3}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignUpScreen}
            options={() => ({
              headerLeft: null,
            })}
          />

          {/* Authentication User screens */}
          <Stack.Screen
            name="EmailScreen"
            component={EmailScreen}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="VerificationScreen"
            component={VerificationScreen}
            options={{
              title: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UserNameImageScreen"
            component={UserNameImageScreen}
            options={{
              title: null,
              headerShown: false,
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
              headerLeft: null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App = () => {
  return (
    <ReduxProvider store={store}>
      <Main />
    </ReduxProvider>
  );
};

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
