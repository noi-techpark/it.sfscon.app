import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./BottomTabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getSfsCon } from "../store/actions/AppActions";
import ToasterComponent from "../components/ToasterComponent";
import * as SplashScreen from "expo-splash-screen";
import { authorizeUser } from "../store/actions/AuthActions";
import moment from "moment";

SplashScreen.preventAutoHideAsync();

export default Navigation = () => {
  const dispatch = useDispatch();

  const appInfo = useSelector((state) => state.app.db);
  const updateDataCounter = useSelector((state) => state.app.updateDataCounter);

  const { last_updated, next_try_in_ms } = appInfo || {};

  const [authorizedLoader, setAuthorizedLoader] = useState(false);

  const init = async () => {
    setAuthorizedLoader(true);
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    dispatch(authorizeUser(init));
  }, []);

  useEffect(() => {
    if (authorizedLoader) {
      if (last_updated) {
        setTimeout(() => {
          dispatch(getSfsCon(last_updated));
        }, next_try_in_ms || 120000);
      } else {
        dispatch(getSfsCon(last_updated));
      }
    }
  }, [authorizedLoader, updateDataCounter]);

  return (
    <NavigationContainer theme={{ colors: { background: "#FFF" } }}>
      <BottomTabNavigation />
      <ToasterComponent />
    </NavigationContainer>
  );
};
