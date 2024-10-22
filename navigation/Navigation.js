import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./BottomTabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getSfsCon } from "../store/actions/AppActions";
import { BackHandler } from "react-native";
import ToasterComponent from "../components/ToasterComponent";
import * as SplashScreen from "expo-splash-screen";
import { authorizeUser } from "../store/actions/AuthActions";
import { storageDeleteItem } from "../tools/secureStore";

SplashScreen.preventAutoHideAsync();

export default Navigation = () => {
  const dispatch = useDispatch();

  const appInfo = useSelector((state) => state.app.db);
  const token = useSelector((state) => state.auth.token);
  const updateDataCounter = useSelector((state) => state.app.updateDataCounter);
  const offlineMode = useSelector((state) => state.app.offlineMode);

  const deleteToken = async () => {
    await storageDeleteItem("jwt");
  };

  const { last_updated, next_try_in_ms } = appInfo || {};

  useEffect(() => {
    dispatch(authorizeUser());
  }, []);

  useEffect(() => {
    (async () => {
      if (token) {
        await SplashScreen.hideAsync();
      }
    })();
  }, [token]);

  useEffect(() => {
    if (offlineMode) return;
    if (last_updated) {
      setTimeout(() => {
        dispatch(getSfsCon(last_updated, false));
      }, next_try_in_ms || 300000);
    } else {
      dispatch(getSfsCon());
    }
  }, [offlineMode, updateDataCounter]);

  return (
    <NavigationContainer theme={{ colors: { background: "#FFF" } }}>
      <BottomTabNavigation />
      <ToasterComponent />
    </NavigationContainer>
  );
};
