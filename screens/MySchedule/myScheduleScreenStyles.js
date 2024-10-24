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

    title: {
      fontSize: 26,
      fontWeight: "800",
      color: theme.title,
    },

    scollViewContainer: {
      flex: 1,
      justifyContent: "center",
    },

    mySchedulesContainer: {
      paddingHorizontal: 20,
    },

    session: {
      paddingVertical: 8,
      borderBottomWidth: 0.6,
      borderBottomColor: "rgba(0, 0, 0, 0.1)",
    },

    lastSession: {
      borderBottomWidth: 0,
    },

    sessionTitle: {
      fontSize: 16,
      marginVertical: 8,
    },

    abstract: {
      marginBottom: 8,
    },

    sessionDetails: {
      flexDirection: "row",
    },

    timeContainer: {
      flexDirection: "row",
      alignSelf: "center",
      alignItems: "center",
      backgroundColor: "#F0F8FD",
      marginRight: 12,
      padding: 6,
      borderRadius: 30,
    },

    roomContainer: {
      flexDirection: "row",
      alignSelf: "center",
      alignItems: "center",
      backgroundColor: "#F0F8FD",
      padding: 6,
      borderRadius: 30,
    },

    clock: {
      color: theme.secondaryTitle,
    },

    time: {
      color: theme.secondaryTitle,
      marginLeft: 4,
      fontSize: 15,
    },

    homeIcon: {
      color: theme.secondaryTitle,
      marginRight: 4,
    },

    roomName: {
      color: theme.secondaryTitle,
      fontSize: 15,
    },

    speakersTitle: {
      marginBottom: 6,
      fontSize: 12,
      color: theme.textMedium,
    },

    speaker: {
      color: theme.text,
    },

    bookmark: {
      position: "absolute",
      right: 0,
      bottom: 8,
      flex: 1,
      alignItems: "flex-end",
      marginRight: 5,
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
