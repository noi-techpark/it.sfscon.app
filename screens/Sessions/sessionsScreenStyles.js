import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
    },

    sessionContainer: {
      flex: 1,
      flexDirection: "row",
    },

    main: {
      paddingHorizontal: 20,
    },

    emptyContainer: {
      width: "80%",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },

    emptyText: {
      textAlign: "center",
      marginTop: 20,
    },

    timeContainer: {
      backgroundColor: theme.inputBackground,
      flexBasis: "20%",
      paddingTop: 16,
      paddingHorizontal: 8,
      alignItems: "center",
      justifyContent: "flex-start",
    },

    time: {
      fontWeight: "600",
      color: theme.title,
    },

    stillActiveTime: {
      color: theme.secondaryTitle,
    },

    topRadius: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },

    session: {
      backgroundColor: theme.inputBackground,
      flexBasis: "76%",
      marginBottom: 15,
      borderRadius: 10,
      marginLeft: 8,
      paddingTop: 8,
      paddingHorizontal: 8,
    },

    headerTrack: {
      fontSize: 12,
      marginBottom: 8,
      fontWeight: "600",
    },

    sessionTitle: {
      fontSize: 14,
      marginBottom: 8,
      fontWeight: "600",
    },

    sessionAbstract: {
      marginBottom: 8,
    },

    trackContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    trackName: {
      marginLeft: 5,
    },

    speakers: {},

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
      fontSize: 12,
      flex: 1,
      color: theme.textLight,
    },

    timelapseText: {
      color: theme.secondaryButtonTextColor,
    },

    bookmark: {
      flex: 1,
      alignItems: "flex-end",
      marginRight: 5,
    },

    bookmarkBtn: {
      padding: 10,
    },

    bookmarkIcon: {
      color: theme.ratingSelected,
    },

    bookmarkIconSelected: {
      color: theme.textMedium,
    },
  });
};

export default getStyles;
