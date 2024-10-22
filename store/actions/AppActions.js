import {
  SET_THEME,
  GET_CONFERENCE_SUCCESS,
  GET_CONFERENCE_FAIL,
  SET_SELECTED_DAY,
  SET_SELECTED_TRACKS,
  TOGGLE_MY_SCHEDULE,
  GET_MY_SCHEDULE_SUCCESS,
  GET_MY_SCHEDULE_FAIL,
  SET_RATING_SUCCESS,
  SET_RATING_FAIL,
  RESET_TRACKS_AND_DAY,
  SET_UPDATE_DATA_COUNTER,
  TOGGLE_TAB_BAR_VISIBILITY,
  SET_APP_OFFLINE_MODE,
  SET_PUSH_NOTIFICATION_TOKEN,
} from "../constants/AppConstants";

import { showLoader, hideLoader } from "./UtilsActions";

import {
  SET_HIDE_LOADER,
  SET_TOAST_MESSAGE,
} from "../constants/UtilsConstants";

import errorHandler from "../../tools/errorHandler";
import { storageGetItem } from "../../tools/secureStore";
import { Platform } from "react-native";

import { APP_VERSION } from "../../constants/buildVersion";

import api from "../../service/service";
import axios from "../../service/service";

const formatData = (data) => {
  if (!data?.conference) return;
  const sessions = data?.conference?.db?.sessions;

  Object.keys(sessions).forEach((id) => {
    const session = sessions[id];
    const del = ";;";
    const searchTerms = [session.title];

    if (session.abstract) {
      searchTerms.push(session.abstract);
    }
    session.rating =
      id in data?.ratings?.rates_by_session
        ? data?.ratings?.rates_by_session[id]
        : [0, 0];

    session.searchTerms = searchTerms.join(del);
  });
  return data;
};

export const setPushNotificationToken = (token) => async (dispatch) => {
  dispatch({ type: SET_PUSH_NOTIFICATION_TOKEN, payload: token });
};

export const authorizePushNotificationToken = (token) => async (dispatch) => {
  try {
    const url = "/api/notication-token";
    await api.post(url, { token });
  } catch (error) {}
};

export const setAppTheme = (theme) => (dispatch) => {
  dispatch({ type: SET_THEME, payload: theme });
};

export const getSfsCon =
  (last_update = null, loader = true) =>
  async (dispatch) => {
    try {
      if (loader) {
        dispatch(showLoader());
      }

      const params = {
        app_version: APP_VERSION,
        device: Platform.OS,
      };

      if (last_update) {
        params["last_update"] = last_update;
      }

      const url = `/api/conference`;

      const response = await api.get(url);

      const { data } = response;

      dispatch(setUpdateDataCounter(data.next_try_in_ms));

      const formatedData = formatData(data);

      dispatch({ type: GET_CONFERENCE_SUCCESS, payload: formatedData });
    } catch (error) {
      const errMessage = errorHandler(error);
      dispatch({
        type: SET_TOAST_MESSAGE,
        payload: { message: errMessage, type: "error" },
      });
      dispatch({ type: GET_CONFERENCE_FAIL });
    } finally {
      dispatch(hideLoader());
    }
  };

export const setSelectedDay = (day) => (dispatch) => {
  dispatch({ type: SET_SELECTED_DAY, payload: day });
  setTimeout(() => {
    dispatch({ type: SET_HIDE_LOADER });
  }, 1500);
};

export const setSelectedTracks =
  (tracks, defaultFilter = "SFSCON") =>
  (dispatch) => {
    if (tracks.length) {
      tracks = [...tracks, defaultFilter];
    }

    dispatch({ type: SET_SELECTED_TRACKS, payload: tracks });
  };

export const getMySchedules = () => async (dispatch) => {
  try {
    const conferenceId = await storageGetItem("conferenceId");
    const url = `/api/conferences/${conferenceId}/bookmarks`;
    const response = await api.get(url);
    const { data } = response;
    dispatch({ type: GET_MY_SCHEDULE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_MY_SCHEDULE_FAIL, payload: error });
  }
};

export const setMySchedule = (sessionId) => async (dispatch) => {
  try {
    const url = `/api/sessions/${sessionId}/bookmarks/toggle`;
    const response = await api.post(url, {});

    const {
      data: { bookmarked },
    } = response;
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: {
        message: !bookmarked
          ? "Session removed from bookmarks"
          : "Session bookmarked",
        type: "info",
      },
    });
    dispatch(getSfsCon(null, false));
    dispatch({ type: TOGGLE_MY_SCHEDULE });
  } catch (error) {
    const errMessage = errorHandler(error);
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: { message: errMessage, type: "error" },
    });
  }
};

export const postRatings = (sessionId, rate) => async (dispatch) => {
  try {
    const url = `/api/sessions/${sessionId}/rate`;
    const response = await api.post(url, { rating: rate });
    const { data } = response;
    const { avg, nr, my_rate } = data;
    dispatch({
      type: SET_RATING_SUCCESS,
      payload: { avg, nr, sessionId, my_rate },
    });

    dispatch(getSfsCon(null, false));
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: { message: "Thank you for your feedback", type: "info" },
    });
  } catch (error) {
    dispatch({ type: SET_RATING_FAIL });
  }
};

export const toggleTabBarVisibility = (visibility) => (dispatch) => {
  dispatch({ type: TOGGLE_TAB_BAR_VISIBILITY, payload: visibility });
};

export const resetTracksAndDaysSelected = () => (dispatch) => {
  dispatch({ type: RESET_TRACKS_AND_DAY });
};

export const setUpdateDataCounter = (next_try_in_ms) => (dispatch) => {
  dispatch({ type: SET_UPDATE_DATA_COUNTER, payload: next_try_in_ms });
};

export const setAppOfflineMode = () => async (dispatch) => {
  dispatch({ type: SET_APP_OFFLINE_MODE, payload: true });
};

export const readFromBackupServer = () => async (dispatch, getState) => {
  try {
    const {
      app: { db },
    } = getState();

    dispatch(setAppOfflineMode(true));

    if (!db) {
      const url = "https://documents.digitalcube.dev/opencon/sfs2024.json";
      const response = await axios.get(url);

      const { data } = response;

      const formatedData = formatData(data);

      dispatch({
        type: GET_CONFERENCE_SUCCESS,
        payload: formatedData,
      });
    }
  } catch (error) {
    console.log("usao sam opet", error);
  } finally {
  }
};
