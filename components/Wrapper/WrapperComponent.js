import { SafeAreaView } from "react-native-safe-area-context";

export default WrapperComponent = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 16 }}>{children}</SafeAreaView>
  );
};
