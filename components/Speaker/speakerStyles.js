import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    speaker: {
      flexDirection: "row",
    },

    speakersTitle: {
      fontSize: 10,
      color: theme.text,
      marginBottom: 8,
    },

    imageContainer: {
      width: 40,
      height: 40,
      borderRadius: 100,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.inputBackground,
    },

    profilePicture: {
      width: "100%",
      height: "100%",
    },

    speakerInfo: {
      flex: 1,
      marginLeft: 6,
      justifyContent: "center",
    },

    speakerName: {
      fontSize: 12,
      color: theme.title,
    },

    companyName: {
      maxWidth: "95%",
      fontSize: 12,
      flex: 1,
      color: theme.textLight,
    },
  });
};

export default getStyles;
