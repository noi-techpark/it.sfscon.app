import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./BottomTabNavigation";
import { useDispatch, useSelector } from "react-redux";
import {
  authorizePushNotificationToken,
  getSfsCon,
} from "../store/actions/AppActions";
import ToasterComponent from "../components/ToasterComponent";
import * as SplashScreen from "expo-splash-screen";
import { authorizeUser } from "../store/actions/AuthActions";

SplashScreen.preventAutoHideAsync();

export default Navigation = ({}) => {
  const dispatch = useDispatch();

  const appInfo = useSelector((state) => state.app.db);
  const pushNotificationToken = useSelector(
    (state) => state.app.pushNotificationToken
  );
  const authorizationFinished = useSelector(
    (state) => state.auth.authorizationFinished
  );
  const updateDataCounter = useSelector((state) => state.app.updateDataCounter);
  const offlineMode = useSelector((state) => state.app.offlineMode);

  const { last_updated, next_try_in_ms } = appInfo || {};

  useEffect(() => {
    dispatch(authorizeUser());
  }, []);

  useEffect(() => {
    (async () => {
      if (authorizationFinished) {
        dispatch(authorizePushNotificationToken(pushNotificationToken));
        dispatch(getSfsCon(null, false));
        await SplashScreen.hideAsync();
      }
    })();
  }, [authorizationFinished]);

  useEffect(() => {
    if (offlineMode) return;
    if (last_updated) {
      setTimeout(() => {
        dispatch(getSfsCon(last_updated));
      }, next_try_in_ms || 300000);
    }
  }, [offlineMode, last_updated, updateDataCounter]);

  return (
    <NavigationContainer theme={{ colors: { background: "#FFF" } }}>
      <BottomTabNavigation />
      <ToasterComponent />
    </NavigationContainer>
  );
};
