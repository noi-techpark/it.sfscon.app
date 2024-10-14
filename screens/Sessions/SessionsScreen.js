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
import { getMySchedules, setMySchedule } from "../../store/actions/AppActions";
import EmptyScreen from "../../components/EmptyScreen";

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
  const mySchedules = useSelector((state) => state.app.mySchedules);
  const scheduleToggled = useSelector((state) => state.app.scheduleToggled);

  const navigation = useNavigation();
  const scrollRef = useRef();

  const [loader, setLoader] = useState(false);
  const [sessionsByDay, setSessionsByDay] = useState({});
  const [sessionSet, setSessionSet] = useState(false);

  const filterSessionByTracks = () => {
    let temp = {};
    if (selectedTracks?.length) {
      for (let s in sessionsByDay) {
        if (selectedTracks.indexOf(sessionsByDay[s].id_track) !== -1) {
          temp[s] = sessionsByDay[s];
        }
      }
      setSessionsByDay(temp);
    }
  };

  const filterSessionBySearchTerm = () => {
    let temp = {};
    for (let s in sessions) {
      if (
        sessions[s]?.title.toLowerCase()?.indexOf(searchTerm.toLowerCase()) !==
          -1 &&
        sessions[s].date === selectedDay
      ) {
        temp[s] = sessions[s];
      }
    }
    setSessionsByDay(temp);
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
          filteredSessions[key]?.title
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
    dispatch(getMySchedules());
  }, [scheduleToggled]);

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
                onPress={() =>
                  navigation.navigate("Schedule", {
                    screen: "SessionDetails",
                    params: { session: item, track },
                  })
                }
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
                {item?.id_lecturers?.length ? (
                  <View style={styles.speakers}>
                    <Text stylesProp={styles.speakersTitle}>Speakers:</Text>
                    {item.id_lecturers.map((lect, idx) => {
                      const lecturer = getData(store?.lecturers, lect);
                      return (
                        <View key={idx} style={styles.speaker}>
                          <View style={styles.imageContainer}>
                            {lecturer?.profile_picture ? (
                              <Image
                                resizeMode="cover"
                                source={{ uri: lecturer?.profile_picture }}
                                style={styles.profilePicture}
                              />
                            ) : (
                              <SVGAvatar />
                            )}
                          </View>
                          <View style={styles.speakerInfo}>
                            <Text stylesProp={styles.speakerName}>
                              {lecturer.display_name}
                            </Text>
                            <Text stylesProp={styles.speakerSession}></Text>
                          </View>
                        </View>
                      );
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
    <EmptyScreen title="There are no lectures for this day according to the selected filters" />
  );
};
