import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default WrapperComponent = ({ children }) => {
  const insets = useSafeAreaInsets();

  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
};
