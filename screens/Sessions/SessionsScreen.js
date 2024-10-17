import { useState, useEffect, useMemo, useRef } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import moment from "moment";
import { getTheme } from "../../tools/getTheme";
import { getData } from "../../tools/sessions";
import getStyles from "./sessionsScreenStyles";
import { Ionicons, Feather } from "@expo/vector-icons";
import SVGAvatar from "../../assets/icons/avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Text from "../../components/TextComponent";
import { fromObjectToArray } from "../../tools/sessions";
import { FlatList } from "react-native-gesture-handler";
import {
  setMySchedule,
  toggleTabBarVisibility,
} from "../../store/actions/AppActions";
import EmptyScreen from "../../components/EmptyScreen";
import Speaker from "../../components/Speaker/Speaker";

export default SessionsComponent = ({
  sessions = {},
  store = {},
  searchTerm = "",
}) => {
  const theme = getTheme();
  const dispatch = useDispatch();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const { tracks = {}, rooms = {} } = store || {};

  const selectedDay = useSelector((state) => state.app.selectedDay);
  const selectedTracks = useSelector((state) => state.app.selectedTracks);

  const mySchedules = useSelector((state) => state.app.db?.bookmarks);

  const navigation = useNavigation();
  const scrollRef = useRef();

  const [loader, setLoader] = useState(false);
  const [sessionsByDay, setSessionsByDay] = useState({});

  const navigateToDetails = (item, track) => {
    dispatch(toggleTabBarVisibility("hidden"));
    navigation.navigate("Schedule", {
      screen: "SessionDetails",
      params: { session: item, track },
    });
  };

  const filterSessionByDay = () => {
    let filteredSessions = { ...sessions };

    if (selectedDay) {
      filteredSessions = Object.keys(filteredSessions).reduce((acc, key) => {
        if (filteredSessions[key].date === selectedDay) {
          acc[key] = filteredSessions[key];
        }
        return acc;
      }, {});
    }

    if (searchTerm?.length) {
      filteredSessions = Object.keys(filteredSessions).reduce((acc, key) => {
        if (
          filteredSessions[key]?.searchTerms
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase()) !== -1
        ) {
          acc[key] = filteredSessions[key];
        }
        return acc;
      }, {});
    }

    if (selectedTracks?.length) {
      filteredSessions = Object.keys(filteredSessions).reduce((acc, key) => {
        if (selectedTracks.includes(filteredSessions[key].id_track)) {
          acc[key] = filteredSessions[key];
        }
        return acc;
      }, {});
    }

    setSessionsByDay(filteredSessions);
  };

  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        setLoader(false);
      }, 800);
    }
  }, [loader]);

  useEffect(() => {
    filterSessionByDay();
  }, [selectedDay, selectedTracks, searchTerm]);

  useEffect(() => {
    setTimeout(() => {
      scrollRef?.current?.scrollToOffset({ animated: false, offset: 0 });
    }, 0);
  }, [selectedDay]);

  return Object.keys(sessionsByDay).length ? (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={() => {
          scrollRef.current.scrollToIndex({
            index: 0,
            viewPosition: 0,
          });
        }}
        data={fromObjectToArray(sessionsByDay)}
        renderItem={({ item, index }) => {
          const track = getData(tracks, item.id_track);
          const room = getData(rooms, item.id_room);

          return (
            <View key={index} style={styles.sessionContainer}>
              <View
                style={
                  index === 0
                    ? { ...styles.timeContainer, ...styles.topRadius }
                    : styles.timeContainer
                }
              >
                <Text bold stylesProp={styles.time}>
                  {moment(item.start).format("HH:mm")}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigateToDetails(item, track)}
                style={styles.session}
              >
                <Text
                  bold
                  stylesProp={{
                    ...styles.headerTrack,
                    color: track?.color ?? theme.secondaryTitle,
                  }}
                >
                  {track?.name}
                </Text>
                <Text bold stylesProp={styles.sessionTitle}>
                  {item.title}
                </Text>

                {item.abstract ? (
                  <Text stylesProp={styles.sessionAbstract}>
                    {item.abstract}
                  </Text>
                ) : null}
                {item?.id_lecturers?.length ? (
                  <View style={styles.speakers}>
                    <Text stylesProp={styles.speakersTitle}>Speakers:</Text>
                    {item.id_lecturers.map((lect, idx) => {
                      const lecturer = getData(store?.lecturers, lect);
                      return <Speaker speaker={lecturer} key={idx} />;
                    })}
                  </View>
                ) : null}
                <View style={styles.trackContainer}>
                  <Feather name="home" size={15} color={track.color} />
                  <Text
                    stylesProp={{ ...styles.trackName, color: track.color }}
                  >
                    {room.name}
                  </Text>
                  <>
                    {item.bookmarkable ? (
                      <View style={styles.bookmark}>
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(setMySchedule(item.id));
                          }}
                          style={styles.bookmarkBtn}
                        >
                          {mySchedules.indexOf(item.id) !== -1 ? (
                            <Ionicons
                              name="bookmark"
                              size={18}
                              style={styles.bookmarkIcon}
                            />
                          ) : (
                            <Ionicons
                              name="bookmark-outline"
                              size={18}
                              style={styles.bookmarkIconSelected}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  ) : (
    <EmptyScreen title="No results were found for this day based on the filters selected." />
  );
};
