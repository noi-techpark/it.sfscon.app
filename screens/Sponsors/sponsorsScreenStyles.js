import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    header: {
      marginHorizontal: 20,
      height: 52,
      marginBottom: 16,
      justifyContent: "center",
    },

    headerTitle: {
      fontSize: 26,
      fontWeight: "800",
      color: theme.title,
    },

    sponsorsContainer: {},

    sponsor: {
      alignItems: "center",
      marginBottom: 40,
    },
  });
};

export default getStyles;
