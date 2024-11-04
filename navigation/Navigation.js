import React, { useEffect, useRef } from "react";
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
import * as Notifications from "expo-notifications";

SplashScreen.preventAutoHideAsync();

export default Navigation = ({}) => {
  const dispatch = useDispatch();

  const navigationRef = useRef();

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

  const handleNotificationRedirection = () => {
    dispatch(getSfsCon(last_updated, false));
    navigationRef?.current?.navigate("MySchedule");
  };

  useEffect(() => {
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response", response);
        handleNotificationRedirection();
      });
    const receivedNotificationSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        dispatch(getSfsCon(last_updated, false));
      });

    return () => {
      receivedNotificationSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

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
    <NavigationContainer
      ref={navigationRef}
      theme={{ colors: { background: "#FFF" } }}
    >
      <BottomTabNavigation />
      <ToasterComponent />
    </NavigationContainer>
  );
};
