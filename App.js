import { Provider } from "react-redux";
import store from "./store/store";
import Navigation from "./navigation/Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { usePushNotifications } from "./notifications/usePushNotifications";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const { expoPushToken } = usePushNotifications();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
