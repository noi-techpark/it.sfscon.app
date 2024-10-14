import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./BottomTabNavigation";
import { useDispatch } from "react-redux";
import { getSfsCon } from "../store/actions/AppActions";
import ToasterComponent from "../components/ToasterComponent";
import * as SplashScreen from "expo-splash-screen";
import { authorizeUser } from "../store/actions/AuthActions";

SplashScreen.preventAutoHideAsync();

export default Navigation = () => {
  const dispatch = useDispatch();

  const [authorizedLoader, setAuthorizedLoader] = useState(false);

  const getConference = async () => {
    try {
      dispatch(getSfsCon());
    } catch (error) {
    } finally {
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    dispatch(authorizeUser(setAuthorizedLoader));
  }, []);

  useEffect(() => {
    if (authorizedLoader) {
      getConference();
    }
  }, [authorizedLoader]);

  return (
    <NavigationContainer theme={{ colors: { background: "#FFF" } }}>
      <BottomTabNavigation />
      <ToasterComponent />
    </NavigationContainer>
  );
};
