import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    starContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    rateIcon: {
      marginRight: 4,
    },

    ratingText: {
      marginHorizontal: 6,
      color: theme.textLight,
    },

    reviewCount: {
      color: theme.textLight,
    },
  });
};

export default getStyles;
