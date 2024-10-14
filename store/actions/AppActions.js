import {
  SET_THEME,
  GET_CONFERENCE_SUCCESS,
  GET_CONFERENCE_FAIL,
  SET_SELECTED_DAY,
  SET_SELECTED_TRACKS,
  TOGGLE_MY_SCHEDULE,
  GET_MY_SCHEDULE_SUCCESS,
  GET_MY_SCHEDULE_FAIL,
  GET_RATING_SUCCESS,
  GET_RATING_FAIL,
  SET_RATING_SUCCESS,
  SET_RATING_FAIL,
  RESET_TRACKS_AND_DAY,
} from "../constants/AppConstants";

import { showLoader, hideLoader } from "./UtilsActions";

import {
  SET_HIDE_LOADER,
  SET_TOAST_MESSAGE,
} from "../constants/UtilsConstants";

import errorHandler from "../../tools/errorHandler";
import { storageGetItem, storageSetItem } from "../../tools/secureStore";
import { Platform } from "react-native";

import { APP_VERSION } from "../../constants/buildVersion";

import api from "../../service/service";

export const setAppTheme = (theme) => (dispatch) => {
  dispatch({ type: SET_THEME, payload: theme });
};

export const getSfsCon =
  (last_update = null) =>
  async (dispatch) => {
    try {
      dispatch(showLoader());
      const params = {
        app_version: APP_VERSION,
        device: Platform.OS,
      };

      if (last_update) {
        params["last_update"] = last_update;
      }

      const url = `/api/conference`;

      const getConferenceById = await api.get(url);
      const { data } = getConferenceById;

      if (!data?.conference) return;

      Object.keys(data?.conference?.db?.sessions).forEach((id) => {
        const session = data?.conference?.db?.sessions[id];
        session.rating =
          id in data?.ratings?.rates_by_session
            ? data?.ratings?.rates_by_session[id]
            : [0, 0];
      });

      dispatch({ type: GET_CONFERENCE_SUCCESS, payload: data });
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
    const url = `/api/conferences/sessions/${sessionId}/toggle-bookmark`;
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
    const url = `/api/conferences/sessions/${sessionId}/rate`;
    const response = await api.post(url, { rate: rate });
    const { data } = response;
    const { avg, nr, my_rate } = data;
    dispatch({
      type: SET_RATING_SUCCESS,
      payload: { avg, nr, sessionId, my_rate },
    });
    dispatch({
      type: SET_TOAST_MESSAGE,
      payload: { message: "Thank you for your feedback", type: "info" },
    });
  } catch (error) {
    dispatch({ type: SET_RATING_FAIL });
  }
};

export const getRatings = (sessionId) => async (dispatch) => {
  try {
    const url = `/api/conferences/sessions/${sessionId}/rate`;
    const response = await api.get(url);
    const { data } = response;
    const { avg, nr, my_rate } = data;
    dispatch({
      type: GET_RATING_SUCCESS,
      payload: { avg, nr, sessionId, my_rate },
    });
  } catch (error) {
    dispatch({ type: GET_RATING_FAIL });
  }
};

export const resetTracksAndDaysSelected = () => (dispatch) => {
  dispatch({ type: RESET_TRACKS_AND_DAY });
};
