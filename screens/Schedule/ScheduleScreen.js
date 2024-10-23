import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { TouchableOpacity, View, TextInput } from "react-native";
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
import {
  authorizePushNotificationToken,
  setSelectedTracks,
  toggleTabBarVisibility,
} from "../../store/actions/AppActions";
import { fromObjectToArray } from "../../tools/sessions";
import { useIsFocused } from "@react-navigation/native";
import { logger } from "../../tools/logger";

export default ScheduleScreen = ({ navigation }) => {
  const theme = getTheme();
  const dispatch = useDispatch();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const store = useSelector((state) => state?.app?.db?.conference?.db);
  const isFocused = useIsFocused();

  const { sessions, tracks } = store || {};
  const loader = useSelector((state) => state?.utils?.loader);
  const selectedTracks = useSelector((state) => state?.app?.selectedTracks);
  const pushNotificationToken = useSelector(
    (state) => state?.app?.pushNotificationToken
  );

  const [showTracks, setShowTracks] = useState(false);
  const [clearFilters, setClearFilters] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef();

  const activeFiltersLabel = selectedTracks?.length > 1 ? "filters" : "filter";

  useLayoutEffect(() => {
    if (isFocused) {
      dispatch(toggleTabBarVisibility("show"));
    }
  }, [isFocused]);

  useEffect(() => {
    if (pushNotificationToken) {
      dispatch(authorizePushNotificationToken(pushNotificationToken));
    }
  }, [pushNotificationToken]);

  useEffect(() => {
    (async () => {
      await logger({ pushNotificationToken });
    })();
  }, [pushNotificationToken]);

  useEffect(() => {
    if (inputRef?.current) {
      setTimeout(() => {
        showSearchInput && inputRef?.current?.focus();
      }, 500);
    }
  }, [showSearchInput]);

  if (loader) {
    return <LoaderComponent />;
  }

  return (
    <View style={styles.container}>
      <>
        {tracks && Object.keys(tracks)?.length > 0 ? (
          <TracksComponent
            tracks={fromObjectToArray(tracks)}
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
                  onChangeText={setSearchTerm}
                  ref={inputRef}
                  placeholder="Search for a talk"
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
                Programme
              </Text>
            )}

            <TouchableOpacity
              onPress={() => {
                setShowSearchInput(!showSearchInput);
                setSearchTerm("");
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

        <SessionsComponent
          sessions={sessions}
          store={store}
          searchTerm={searchTerm}
        />
      </>
    </View>
  );
};
