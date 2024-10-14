import { useState, useEffect, useMemo } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import WrapperComponent from "../../components/Wrapper/WrapperComponent";
import Text from "../../components/TextComponent";
import { getTheme } from "../../tools/getTheme";
import { useSelector, useDispatch } from "react-redux";
import { getMySchedules, setMySchedule } from "../../store/actions/AppActions";
import getStyles from "./myScheduleScreenStyles";
import moment from "moment";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import EmptyScreenSVG from "../../assets/icons/empty.svg";
import { getData } from "../../tools/sessions";
import AppLoader from "../../components/AppLoader";
import EmptyScreen from "../../components/EmptyScreen";

export default MyscheduleScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const mySchedules = useSelector((state) => state.app.mySchedules);
  const store = useSelector((state) => state.app?.db?.conference?.db);

  const { sessions, rooms, lecturers, tracks } = store || {};

  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState({});

  const goToDetails = (session, id) => {
    navigation.navigate("MyScheduleSessionDetails", {
      session: {
        ...session,
        id,
      },
    });
  };

  useEffect(() => {
    dispatch(getMySchedules());
  }, []);

  useEffect(() => {
    if (sessions) {
      const filteredSessions = Object.keys(sessions)
        .filter((key) => mySchedules?.includes(key))
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [key]: sessions[key],
          });
        }, {});
      setSchedules(filteredSessions);
    }
  }, [mySchedules]);

  if (loading) {
    return <AppLoader />;
  }

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
          {Object.keys(schedules).length > 0 ? (
            <ScrollView contentContainerStyle={styles.mySchedulesContainer}>
              {Object.keys(schedules).map((s, idx) => {
                const session = sessions[s];
                const room = getData(rooms, session.id_room);
                const track = getData(tracks, session.id_track);
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => goToDetails(session, s, track)}
                  >
                    <View style={styles.session}>
                      <Text bold stylesProp={styles.sessionTitle}>
                        {session.title}
                      </Text>

                      <View style={styles.sessionDetails}>
                        <View style={styles.timeContainer}>
                          <AntDesign
                            name="clockcircleo"
                            size={12}
                            style={styles.clock}
                          />
                          <View>
                            <Text stylesProp={styles.time}>{`${moment(
                              session.start
                            ).format("HH:mm")} - ${moment(session.start)
                              .add(session.duration, "seconds")
                              .format("HH:mm")}`}</Text>
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

                      <View style={styles.speakersContainer}>
                        <Text stylesProp={styles.speakersTitle}>Speakers:</Text>
                        <View style={styles.footer}>
                          <View stylesProp={styles.speakers}>
                            {session?.id_lecturers.length
                              ? session?.id_lecturers.map((lect, idx) => {
                                  const lecturer = getData(lecturers, lect);
                                  return session?.id_lecturers?.length > 1 ? (
                                    <Text
                                      key={idx}
                                    >{`${lecturer.display_name} ,`}</Text>
                                  ) : (
                                    <Text
                                      key={idx}
                                    >{`${lecturer.display_name}`}</Text>
                                  );
                                })
                              : null}
                          </View>

                          <View style={styles.bookmark}>
                            <TouchableOpacity
                              onPress={() => {
                                dispatch(setMySchedule(s));
                              }}
                              style={styles.bookmarkBtn}
                            >
                              <Ionicons
                                name="bookmark"
                                size={18}
                                style={styles.bookmarkIcon}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <EmptyScreen title="There are no bookmarked events" />
          )}
        </View>
      )}
    </View>
  );
};
