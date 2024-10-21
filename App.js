import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Navigation from "./navigation/Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { usePushNotifications } from "./notifications/usePushNotifications";
import { BackHandler } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { storageSetItem } from "./tools/secureStore";
import { API_URL } from "@env";
import WrapperComponent from "./components/Wrapper/WrapperComponent";

export default function App() {
  // const { expoPushToken } = usePushNotifications();

  const setServerToStore = async () => {
    try {
      const url = API_URL;
      await storageSetItem("server", url);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    setServerToStore();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <WrapperComponent>
            <StatusBar />
            <Navigation />
          </WrapperComponent>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
