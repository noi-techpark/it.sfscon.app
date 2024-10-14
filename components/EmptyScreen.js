import { View, StyleSheet } from "react-native";
import Text from "./TextComponent";
import EmptyScreenSVG from "../assets/icons/empty.svg";

const EmptyScreen = ({ title = "" }) => {
  return (
    <View style={styles.container}>
      <EmptyScreenSVG />
      <Text stylesProp={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    maxWidth: "80%",
  },
});

export default EmptyScreen;
