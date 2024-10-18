import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./BottomTabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getSfsCon } from "../store/actions/AppActions";
import ToasterComponent from "../components/ToasterComponent";
import * as SplashScreen from "expo-splash-screen";
import { authorizeUser } from "../store/actions/AuthActions";

SplashScreen.preventAutoHideAsync();

export default Navigation = () => {
  const dispatch = useDispatch();

  const appInfo = useSelector((state) => state.app.db);
  const token = useSelector((state) => state.auth.token);
  const updateDataCounter = useSelector((state) => state.app.updateDataCounter);

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
    if (!token) return;
    if (last_updated) {
      setTimeout(() => {
        dispatch(getSfsCon(last_updated, false));
      }, next_try_in_ms || 120000);
    } else {
      dispatch(getSfsCon());
    }
  }, [token, updateDataCounter]);

  return (
    <NavigationContainer theme={{ colors: { background: "#FFF" } }}>
      <BottomTabNavigation />
      <ToasterComponent />
    </NavigationContainer>
  );
};
