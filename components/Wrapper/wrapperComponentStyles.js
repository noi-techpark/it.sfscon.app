import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
  });
};

export default getStyles;
