import { StyleSheet, Dimensions } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      marginHorizontal: 20,
      flex: 1,
    },

    header: {
      height: 52,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 24,
    },

    headerTitle: {
      color: theme.title,
      fontWeight: "800",
      fontSize: 26,
    },

    searchInput: {
      height: 50,
      justifyContent: "center",
      borderRadius: 15,
      paddingVertical: 8,
      paddingLeft: 40,
      paddingRight: 15,
      flex: 1,
      backgroundColor: theme.inputBackground,
      color: theme.inputColor,
    },

    searchInputIcon: {
      position: "absolute",
      left: 10,
      color: theme.text,
    },

    searchIcon: {
      color: theme.text,
    },

    cancelBtnTxt: {
      fontSize: 12,
      color: theme.text,
      marginLeft: 12,
    },

    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    emptyScreen: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },

    flatListContainer: {
      flex: 1,
    },

    lecturer: {
      flexBasis: "46%",
      marginHorizontal: "2%",
    },

    imageContainer: {
      backgroundColor: theme.avatarContainer,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
    },

    lectProfilePic: {
      width: "100%",
      height: 175,
      borderRadius: 10,
    },

    lectName: {
      fontSize: 18,
      color: theme.title,
      marginTop: 10,
    },

    lectCompany: {
      fontSize: 12,
      marginTop: 10,
      marginBottom: 30,
      color: theme.textLight,
    },
  });
};

export default getStyles;
