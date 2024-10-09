import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    appVersion: {
      alignItems: "center",
      textAlign: "center",
      paddingBottom: 20,
    },

    appVersionText: {
      color: theme.textLight,
      lineHeight: 18
    },
  });
};

export default getStyles;
