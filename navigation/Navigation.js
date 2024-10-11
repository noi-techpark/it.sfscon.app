import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./BottomTabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getSfsCon } from "../store/actions/AppActions";
import ToasterComponent from "../components/ToasterComponent";
import LoaderComponent from "../components/AppLoader";
import { storageSetItem } from "../tools/secureStore";
import { API_URL } from "@env";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default Navigation = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const loader = useSelector((state) => state.utils.loader);
  const Stack = createNativeStackNavigator();

  const [isServerLoaded, setIsServerLoaded] = useState(false);

  const setServerToStore = async () => {
    try {
      const url = API_URL;
      await storageSetItem("server", url);
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      setIsServerLoaded(true);
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    setServerToStore();
  }, []);

  useEffect(() => {
    if (isServerLoaded) {
      dispatch(getSfsCon());
    }
  }, [isServerLoaded]);

  if (loader) {
    return <LoaderComponent renderWithTabBarNav />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="App"
      >
        <Stack.Screen component={BottomTabNavigation} name="App" />
      </Stack.Navigator>
      <ToasterComponent />
    </NavigationContainer>
  );
};
