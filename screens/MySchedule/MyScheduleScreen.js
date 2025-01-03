import React from "react";
import { useState, useEffect, useMemo } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import Text from "../../components/TextComponent";
import { getTheme } from "../../tools/getTheme";
import { useSelector, useDispatch } from "react-redux";
import {
  getMySchedules,
  setMySchedule,
  toggleTabBarVisibility,
} from "../../store/actions/AppActions";
import getStyles from "./myScheduleScreenStyles";
import moment from "moment";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { getData } from "../../tools/sessions";
import AppLoader from "../../components/AppLoader";
import EmptyScreen from "../../components/EmptyScreen";
import Speaker from "../../components/Speaker/Speaker";
import { decodeHTML } from "../../tools/validations";

export default MyscheduleScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const mySchedules = useSelector((state) => state.app.db?.bookmarks);
  const _days = useSelector((state) => state.app.db?.conference?.idx?.days);
  const store = useSelector((state) => state.app?.db?.conference?.db);

  const { sessions, rooms, lecturers, tracks } = store || {};

  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState({});
  const [days, setDays] = useState([]);

  const sortSessionsBySpecificDates = () => {
    const sortedSessions = {};

    const sortedTargetDates = _days.sort((a, b) => new Date(a) - new Date(b));

    const filteredSessions = Object.keys(sessions).filter((key) =>
      mySchedules.includes(key)
    );

    sortedTargetDates.forEach((date) => {
      sortedSessions[date] = [];

      filteredSessions.forEach((key) => {
        if (sessions[key]?.date === date) {
          sortedSessions[date].push(sessions[key]);
        }
      });
    });

    setSchedules(sortedSessions);
  };

  const goToDetails = (session, track) => {
    dispatch(toggleTabBarVisibility("hidden"));
    navigation.navigate("MySchedule", {
      screen: "MyScheduleSessionDetails",
      params: { session: session, track },
    });
  };

  useEffect(() => {
    sortSessionsBySpecificDates();
  }, [mySchedules]);

  useEffect(() => {
    dispatch(getMySchedules());
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text bold stylesProp={styles.title}>
          My Schedule
        </Text>
      </View>

      {loading ? (
        <AppLoader />
      ) : (
        <View style={styles.scollViewContainer}>
          {schedules && Object.keys(schedules).length ? (
            <ScrollView>
              {Object.keys(schedules).map((s, idx) => {
                const bookmarks = schedules[s];
                console.log(s);

                return (
                  <React.Fragment key={idx}>
                    <View style={styles.section}>
                      <View style={styles.sectionHeader}>
                        <Text stylesProp={styles.sectionTitle}>
                          {moment(s).format("dddd DD, MMMM YYYY")}
                        </Text>
                      </View>
                      {bookmarks?.length ? (
                        bookmarks.map((session, idx) => {
                          const room = getData(rooms, session.id_room);
                          const track = getData(tracks, session.id_track);

                          return (
                            <TouchableOpacity
                              key={idx}
                              onPress={() => goToDetails(session, track)}
                            >
                              <View style={styles.session}>
                                <View style={styles.sessionDetails}>
                                  <View style={styles.timeContainer}>
                                    <AntDesign
                                      name="clockcircleo"
                                      size={12}
                                      style={styles.clock}
                                    />
                                    <View>
                                      <Text stylesProp={styles.time}>
                                        {`${moment(session?.start).format(
                                          "HH:mm"
                                        )}`}{" "}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={styles.roomContainer}>
                                    <Feather
                                      name="home"
                                      size={12}
                                      style={styles.homeIcon}
                                    />
                                    <Text stylesProp={styles.roomName}>
                                      {room?.name ?? ""}
                                    </Text>
                                  </View>
                                </View>
                                <Text bold stylesProp={styles.sessionTitle}>
                                  {decodeHTML(session?.title)}
                                </Text>
                                {session?.abstract ? (
                                  <Text stylesProp={styles.abstract}>
                                    {session?.abstract}
                                  </Text>
                                ) : null}
                                <View style={styles.speakersContainer}>
                                  <View style={styles.footer}>
                                    {session?.id_lecturers.length ? (
                                      <Text stylesProp={styles.speakersTitle}>
                                        Speakers:
                                      </Text>
                                    ) : null}
                                    {session?.id_lecturers.length
                                      ? session?.id_lecturers.map(
                                          (lect, idx) => {
                                            const lecturer = getData(
                                              lecturers,
                                              lect
                                            );
                                            return (
                                              <Speaker
                                                speaker={lecturer}
                                                key={idx}
                                              />
                                            );
                                          }
                                        )
                                      : null}
                                    {session?.bookmarkable ? (
                                      <View style={styles.bookmark}>
                                        <TouchableOpacity
                                          onPress={() => {
                                            dispatch(
                                              setMySchedule(session?.id)
                                            );
                                          }}
                                        >
                                          <Ionicons
                                            name="bookmark"
                                            size={18}
                                            style={styles.bookmarkIcon}
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    ) : null}
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>
                          );
                        })
                      ) : (
                        <Text>No bookmarks are selected for this day</Text>
                      )}
                    </View>
                  </React.Fragment>
                );
              })}
            </ScrollView>
          ) : null}
        </View>
      )}
    </View>
  );
};
