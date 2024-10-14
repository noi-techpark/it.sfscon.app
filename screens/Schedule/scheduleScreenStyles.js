import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      marginBottom: 18,
      paddingHorizontal: 20,
    },

    headerTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },

    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    searchInput: {
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

    cancelBtnTxt: {
      fontSize: 12,
      color: theme.text,
      marginLeft: 12,
    },

    headerTitle: {
      fontSize: 26,
      fontWeight: "800",
      color: theme.title,
    },

    filterContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    filtersHolder: {
      flexDirection: "row",
      alignItems: "center",
    },

    activeFiltersHolder: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 14,
      borderRadius: 20,
      paddingHorizontal: 8,
      paddingVertical: 5,
      backgroundColor: theme.secondaryTitle,
    },

    numberOfActiveFilters: {
      color: "#FFF",
      fontSize: 14,
      bottom: 1,
    },

    closeIcon: {
      marginLeft: 6,
    },

    filterTitle: {
      fontSize: 18,
      color: theme.title,
    },

    filter: {
      flexDirection: "row",
      alignItems: "center",
    },

    selectedFilter: {
      color: theme.secondaryTitle,
      marginRight: 8,
      fontSize: 18,
      fontWeight: "400",
    },
    filterIcon: {
      color: theme.secondaryTitle,
      alignSelf: "flex-end",
      justifyContent: "center",
    },
  });
};

export default getStyles;
