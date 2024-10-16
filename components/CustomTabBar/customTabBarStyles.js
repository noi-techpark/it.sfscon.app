import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFF",
      borderTopColor: theme.textLight,
      borderTopWidth: 0.3,
      shadowOffset: {
        height: -2,
      },
      shadowOpacity: 0.2,
    },

    tab: {
      flex: 1,
      alignItems: "center",
      borderRadius: 8,
    },

    iconContainer: {
      paddingHorizontal: 16,
      borderRadius: 8,
    },

    iconContainerFocused: {
      backgroundColor: theme.bottomTabNavActive,
    },

    text: {
      color: theme.bottomTabNavInactive,
      fontSize: 10,
      marginTop: 2,
    },

    textFocused: {
      color: theme.bottomTabNavActive,
    },
  });
};

export default getStyles;
