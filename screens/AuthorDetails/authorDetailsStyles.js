import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    listHolder: {
      flex: 1,
    },

    container: {
      flex: 1,
    },

    header: {
      paddingHorizontal: 20,
      marginBottom: 24,
    },

    authorTop: {
      paddingHorizontal: 20,
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
    },

    authorDetails: {
      flex: 1,
      marginLeft: 12,
    },

    authorImage: {
      width: 70,
      height: 70,
      borderRadius: 100,
    },

    authorName: {
      color: theme.title,
      fontSize: 26,
    },

    authorEmail: {
      color: theme.secondaryTitle,
    },

    authorBio: {
      marginBottom: 32,
      flex: 1,
    },

    bioHolderScrollView: {
      paddingHorizontal: 20,
    },

    bio: {
      fontSize: 15,
      color: theme.textMedium,
    },

    sectionTitle: {
      marginTop: 45,
      fontSize: 18,
      fontWeight: "600",
    },

    socials: {
      flexDirection: "row",
    },

    iconBtn: {
      marginRight: 25,
      marginTop: 10,
    },

    socialsIcon: {
      color: theme.inputTextColor,
    },

    footer: {
      paddingBottom: 16,
      alignItems: "flex-start",
    },

    shareAuthorBtn: {
      backgroundColor: theme.primaryButtonBackgroundColor,
      marginTop: 32,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
    },

    shareAuthorBtnText: {
      color: theme.primaryButtonTextColor,
    },
  });
};

export default getStyles;
