import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./BottomTabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getSfsCon } from "../store/actions/AppActions";
import ToasterComponent from "../components/ToasterComponent";
import LoaderComponent from "../components/AppLoader";
import { storageDeleteItem, storageSetItem } from "../tools/secureStore";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default Navigation = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const loader = useSelector((state) => state.utils.loader);
  const Stack = createNativeStackNavigator();

  const [isServerLoaded, setIsServerLoaded] = useState(false);

  const getServerFromAmazon = async () => {
    try {
      const url = "https://sfscon.s3.eu-central-1.amazonaws.com/opencon.json";
      const response = await fetch(url);
      const data = await response.json();
      z`zzz~`;
      //await storageSetItem("server", data?.service_uri);
      await storageSetItem(
        "server",
        "https://webadmin.app.sfscon.testingmachine.eu"
      );
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      setIsServerLoaded(true);
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    getServerFromAmazon();
  }, []);

  useEffect(() => {
    dispatch(getSfsCon(loggedInUser));
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
