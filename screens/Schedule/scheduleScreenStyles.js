import { StyleSheet } from "react-native";

const getStyles = (theme) => {
  return StyleSheet.create({
    header: {
      marginBottom: 18,
      marginLeft: 20,
    },

    headerTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },

    searchContainer: {
      marginRight: 20,
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
      marginRight: 24,
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
