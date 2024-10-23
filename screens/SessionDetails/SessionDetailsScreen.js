import { useState, useEffect, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Text,
} from "react-native";
import { getTheme } from "../../tools/getTheme";
import getStyles from "./sessionDetailsScreenStyles";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../tools/sessions";
import RatingsComponent from "../../components/RateModal/RateModal";
import {
  getMySchedules,
  setMySchedule,
  toggleTabBarVisibility,
} from "../../store/actions/AppActions";
import { useShare } from "../../tools/useShare";
import StarRating from "../../components/RatingStars/RatingStars";
import RoadSVG from "../../assets/road.svg";
import Speaker from "../../components/Speaker/Speaker";
import { decodeHTML } from "../../tools/validations";
import { parseTextWithStyles } from "../../tools/useHtmlParser";
import AppLoader from "../../components/AppLoader";
import Dialog from "../../components/Dialog";

export default SessionDetailsScreen = ({ route, navigation }) => {
  const theme = getTheme();
  const dispatch = useDispatch();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const speakers = useSelector(
    (state) => state.app.db?.conference?.db?.lecturers
  );
  const ratings = useSelector((state) => state.app.db?.ratings);
  const mySchedules = useSelector((state) => state.app.db?.bookmarks);
  const offlineMode = useSelector((state) => state.app.offlineMode);
  const scheduleToggled = useSelector((state) => state.app.scheduleToggled);

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState([0, 0]);
  const [openDialog, setOpenDialog] = useState(false);

  const { session = {}, track = {} } = route?.params || {};
  const { rates_by_session = {}, my_rate_by_session = {} } = ratings || {};

  const handleRateTalk = () => {
    if (offlineMode) {
      setOpenDialog(true);
    } else {
      setShowModal(true);
    }
  };

  const handleUrl = async () => {
    try {
      if (session?.stream_link) {
        const splitStreamLink = session?.stream_link.split("- ")[1];
        const canOpen = await Linking.canOpenURL(splitStreamLink);

        if (!canOpen) throw new Error("Unable to open link");

        await Linking.openURL(splitStreamLink);
      }
    } catch (error) {
      console.log("ERR", error);
    }
  };

  const formatEndTime = () => {
    return moment(session?.start)
      .add(session?.duration, "seconds")
      .format("HH:mm");
  };

  const { share } = useShare();

  const findSession = () => {
    if (session?.id in rates_by_session) {
      setRating(rates_by_session[session?.id]);
    }
  };

  const onShare = async (link) => {
    await share({ url: link, title: "SFSCon", message: "SFSCon" });
  };

  const handleGoBack = () => {
    dispatch(toggleTabBarVisibility("show"));
    const lastVisited = route?.params?.lastVisited;
    lastVisited
      ? navigation.navigate(lastVisited, { session, track })
      : navigation.goBack();
  };

  useEffect(() => {
    findSession();
  }, [session.id, rates_by_session]);

  useEffect(() => {
    dispatch(getMySchedules());
  }, [scheduleToggled]);

  return (
    <>
      {openDialog ? (
        <Dialog isVisible={openDialog} setIsVisible={setOpenDialog} />
      ) : null}
      <RatingsComponent
        session={session.id}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.goBackBtn} onPress={handleGoBack}>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={theme.textMedium}
              style={styles.goBackIcon}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text numberOfLines={2} style={styles.title}>
              {decodeHTML(session?.title)}
            </Text>
          </View>

          {session?.bookmarkable ? (
            <TouchableOpacity
              onPress={() => dispatch(setMySchedule(session.id))}
              style={styles.bookmarkBtn}
            >
              {mySchedules.indexOf(session.id) !== -1 ? (
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
          ) : null}
        </View>

        <ScrollView bounces={false} style={styles.scrollView}>
          {session?.rateable ? (
            <TouchableOpacity
              disabled={offlineMode}
              onPress={() => setShowModal(true)}
              style={styles.reviewContainer}
            >
              <StarRating rating={rating[0]} numberOfReviews={rating[1]} />
            </TouchableOpacity>
          ) : null}

          <View style={styles.eventDetailsContainer}>
            <View style={styles.eventDetail}>
              <Feather name="calendar" size={18} style={styles.eventIcon} />
              <Text numberOfLines={1} style={styles.eventText}>
                {moment(session?.date).format("DD MMM YYYY")}
              </Text>
            </View>
            <View style={styles.eventDetail}>
              <Feather name="clock" size={18} style={styles.eventIcon} />
              <Text numberOfLines={1} style={styles.eventText}>
                {`${moment(session.start).format(
                  "HH:mm"
                )} - ${formatEndTime()}`}
              </Text>
            </View>

            <View style={styles.eventDetail}>
              <View style={styles.roadSvgHolder}>
                <RoadSVG />
              </View>
              <Text numberOfLines={1} style={styles.eventText}>
                {track?.name}
              </Text>
            </View>
          </View>

          <View style={styles.main}>
            {session?.stream_link ? (
              <View style={styles.streamContainer}>
                <Text
                  bold
                  style={{ ...styles.mainTitle, ...styles.streamTitle }}
                >
                  Location
                </Text>

                <TouchableOpacity style={styles.streamBtn} onPress={handleUrl}>
                  <Text numberOfLines={1} style={styles.streamLink}>
                    {session?.stream_link}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )}

            <View style={styles.descriptionContainer}>
              <Text bold style={styles.mainTitle}>
                Description
              </Text>
              {session.description ? (
                <WebViewComponent source={session?.description} margin={20} />
              ) : (
                <Text>No description</Text>
              )}
            </View>

            {session?.id_lecturers.length ? (
              <View style={styles.speakersContainer}>
                <Text
                  bold
                  style={{
                    ...styles.mainTitle,
                    ...styles.speakersTitle,
                  }}
                >
                  Speakers
                </Text>

                {session?.id_lecturers.map((s, idx) => {
                  const speaker = getData(speakers, s);
                  return speaker ? (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("AuthorDetails", {
                          author: speaker,
                        })
                      }
                      key={idx}
                      style={styles.speaker}
                    >
                      <Speaker speaker={speaker} key={idx} />
                    </TouchableOpacity>
                  ) : null;
                })}
              </View>
            ) : null}
            <View style={styles.ratingsFooter}>
              <Text bold style={styles.footerHeading}>
                What do you think about this talk?
              </Text>
              <Text style={styles.footerSecondaryHeading}>
                We are interested in hearing your feedback
              </Text>

              <View style={styles.footerTop}>
                {session?.rateable ? (
                  <TouchableOpacity
                    style={{ ...styles.actionButton, ...styles.rateBtn }}
                    onPress={handleRateTalk}
                  >
                    <Text bold style={styles.btnLabel}>
                      Rate the talk
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {session.can_share ? (
                  <TouchableOpacity
                    onPress={() =>
                      onShare(session?.share_link || "https://www.sfscon.it/")
                    }
                    style={{ ...styles.actionButton, ...styles.shareBtn }}
                  >
                    <Text bold style={styles.btnLabel}>
                      Share the talk
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
