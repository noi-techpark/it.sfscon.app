import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    header: {
      marginHorizontal: 20,
      height: 52,
      justifyContent: "center",
    },

    headerTitle: {
      fontSize: 26,
      fontWeight: "800",
      color: theme.title,
    },

    linksContainer: {
      flex: 1,
      justifyContent: "center",
    },
  });
};

export default getStyles;
