import React, { useState, useMemo, useRef, useEffect } from "react";
import { TouchableOpacity, View, TextInput } from "react-native";
import WrapperComponent from "../../components/Wrapper/WrapperComponent";
import getStyles from "./scheduleScreenStyles";
import { getTheme } from "../../tools/getTheme";
import { useDispatch, useSelector } from "react-redux";
import DaysComponent from "../../components/DaysComponent";
import SessionsComponent from "../Sessions/SessionsScreen";
import { AntDesign } from "@expo/vector-icons";
import SecondaryButtonComponent from "../../components/UI/SecondaryButtonComponent";
import LoaderComponent from "../../components/AppLoader";
import TracksComponent from "../../components/Tracks/TracksComponent";
import Text from "../../components/TextComponent";
import FilterActiveSVG from "../../assets/filter_active.svg";
import FilterDefaultSVG from "../../assets/filter_default.svg";
import { setSelectedTracks } from "../../store/actions/AppActions";
import { fromObjectToArray } from "../../tools/sessions";

export default ScheduleScreen = ({ navigation }) => {
  const theme = getTheme();
  const dispatch = useDispatch();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [showTracks, setShowTracks] = useState(false);
  const store = useSelector((state) => state?.app?.db?.conference?.db);
  const selectedTracks = useSelector((state) => state?.app?.selectedTracks);
  const [tracks, setTracks] = useState(fromObjectToArray(tracks));
  const [sessions, setSessions] = useState(store?.sessions);
  const [clearFilters, setClearFilters] = useState(false);
  const [tracksSearchValue, setTracksSearchValue] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const inputRef = useRef();

  const activeFiltersLabel = selectedTracks?.length > 1 ? "filters" : "filter";

  const filterTracks = (term) => {
    if (!term) {
      return;
    }
    const filteredSessions = fromObjectToArray(sessions);
    console.log("FILTERED", filteredSessions);

    // setSessions(
    //   filteredSessions.filter((track) =>
    //     track.title.toLowerCase().includes(term.toLowerCase())
    //   )
    // );
  };

  useEffect(() => {
    if (inputRef?.current) {
      setTimeout(() => {
        showSearchInput && inputRef?.current?.focus();
      }, 500);
    }
  }, [showSearchInput]);

  return !store ? (
    <LoaderComponent />
  ) : (
    <WrapperComponent>
      <>
        {tracks && tracks?.length > 0 ? (
          <TracksComponent
            tracks={tracks}
            clearFiltersFlag={clearFilters}
            showModal={showTracks}
            setShowModal={setShowTracks}
          />
        ) : (
          <></>
        )}

        <View style={styles.header}>
          <View style={styles.headerTop}>
            {showSearchInput ? (
              <>
                <TextInput
                  onChangeText={(term) => {
                    filterTracks(term);
                  }}
                  ref={inputRef}
                  placeholder="Search authors"
                  style={styles.searchInput}
                />

                <AntDesign
                  name="search1"
                  size={22}
                  style={styles.searchInputIcon}
                />
              </>
            ) : (
              <Text bold stylesProp={styles.headerTitle}>
                Schedule
              </Text>
            )}

            <TouchableOpacity
              onPress={() => {
                setShowSearchInput(!showSearchInput);
              }}
              style={styles.searchContainer}
            >
              {showSearchInput ? (
                <Text stylesProp={styles.cancelBtnTxt}>Cancel</Text>
              ) : (
                <AntDesign name="search1" size={22} color={theme.title} />
              )}
            </TouchableOpacity>
          </View>
          <DaysComponent />

          <View style={styles.filterContainer}>
            <Text stylesProp={styles.filterTitle}>Tracks</Text>
            <View style={styles.filtersHolder}>
              {!selectedTracks.length ? (
                <SecondaryButtonComponent
                  handlePress={() => {
                    setShowTracks(true);
                    setClearFilters(false);
                  }}
                  stylesProp={{
                    button: styles.filter,
                    label: styles.selectedFilter,
                  }}
                  label={"Filter"}
                >
                  <FilterDefaultSVG />
                </SecondaryButtonComponent>
              ) : (
                <>
                  <View style={styles.activeFiltersHolder}>
                    <Text stylesProp={styles.numberOfActiveFilters}>
                      {`${
                        selectedTracks?.length - 1
                      } ${activeFiltersLabel} selected`}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(setSelectedTracks([]));
                        setClearFilters(true);
                      }}
                    >
                      <AntDesign
                        name="close"
                        size={20}
                        style={styles.closeIcon}
                        color={theme.primaryButtonTextColor}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => setShowTracks(true)}>
                    <FilterActiveSVG />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
        <SessionsComponent sessions={sessions} store={store} />
      </>
    </WrapperComponent>
  );
};
