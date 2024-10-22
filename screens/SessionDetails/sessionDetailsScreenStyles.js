import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 16,
      paddingHorizontal: 20,
    },

    scrollView: {
      paddingHorizontal: 20,
    },

    bookmarkIcon: {
      color: theme.ratingSelected,
    },

    titleContainer: {
      flex: 1,
      marginHorizontal: 8,
    },

    title: {
      fontWeight: "bold",
      color: theme.title,
      fontSize: 18,
    },

    reviewContainer: {
      flexDirection: "row",
      marginTop: 25,
    },

    reviewIconBtn: {
      marginRight: 6,
    },

    reviewCount: {
      color: theme.textLight,
    },

    eventDetailsContainer: {
      marginTop: 35,
    },

    eventDetail: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },

    eventText: {
      marginLeft: 8,
      color: theme.textMedium,
      maxWidth: "90%",
    },

    eventIcon: {
      color: theme.primary,
    },

    mainTitle: {
      fontSize: 18,
      marginTop: 30,
      marginBottom: 10,
      fontWeight: "600",
    },

    streamTitle: {
      marginBottom: 0,
    },

    streamBtn: {
      paddingVertical: 10,
    },

    streamLink: {
      color: theme.primary,
    },

    descriptionContainer: {
      marginBottom: 24,
    },

    description: {
      fontSize: 16,
      color: theme.textMedium,
    },

    bold: {
      fontWeight: "bold",
    },

    italic: {
      fontStyle: "italic",
    },

    link: {
      color: "blue",
      textDecorationLine: "underline",
    },

    speakersContainer: {
      marginBottom: 40,
    },

    speaker: {
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
    },

    speakersTitle: {
      marginBottom: 14,
    },

    imageContainer: {
      backgroundColor: theme.avatarContainer,
      borderRadius: 100,
      alignSelf: "center",
    },

    profilePicture: {
      width: 32,
      height: 32,
      borderRadius: 100,
    },

    speakerInfo: {
      marginLeft: 12,
    },

    displayName: {
      fontSize: 15,
      color: theme.textMedium,
    },

    companyName: {
      fontSize: 12,
      flex: 1,
      color: theme.textLight,
    },

    footerHeading: {
      color: theme.title,
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 7,
    },

    footerTop: {
      flexDirection: "row",
      paddingBottom: 16,
    },

    actionButton: {
      backgroundColor: theme.primaryButtonBackgroundColor,
      paddingVertical: 10,
      paddingHorizontal: 12,
      alignSelf: "center",
      marginTop: 30,
      borderRadius: 20,
    },

    rateBtn: {
      marginRight: 24,
    },

    btnLabel: {
      color: theme.primaryButtonTextColor,
    },
  });
};

export default getStyles;
