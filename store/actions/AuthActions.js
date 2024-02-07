import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_FAIL,
  GET_TENANT_ID_SUCCESS,
  GET_TENANT_ID_FAIL,
  RESET_ERROR,
  LOGOUT,
} from "../constants/AuthConstants";
import {
  storageDeleteItem,
  storageGetItem,
  storageSetItem,
} from "../../tools/secureStore";
import {
  SET_TOAST_MESSAGE,
  SET_HIDE_LOADER,
  SET_SHOW_LOADER,
} from "../constants/UtilsConstants";

import errorHandler from "../../tools/errorHandler";

import api from "../../service/service";

export const getServerName = () => async (dispatch) => {
  try {
    const response = await api.get(`/api/tenants/code/OPENCON`);
    const {
      data: { id },
    } = response;
    await storageSetItem("tenantId", id);
    dispatch({ type: GET_TENANT_ID_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: GET_TENANT_ID_FAIL });
  }
};

export const registerPretixUser =
  (pretixCode, expoPushToken, phoneDetails) => async (dispatch) => {
    try {
      const conferenceId = await storageGetItem("conferenceId");
      const url = `/api/conferences/${conferenceId}/pretix`;

      const response = await api.post(url, {
        order: pretixCode,
        pushToken: expoPushToken,
        device: phoneDetails,
      });
      const { data } = response;

      await storageSetItem("jwt", data.token);

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
      dispatch(checkIfTokenIsValid());
    } catch (error) {
      const errMessage = errorHandler(error);
      dispatch({
        type: SET_TOAST_MESSAGE,
        payload: { message: errMessage, type: "error" },
      });
      dispatch({ type: REGISTER_USER_FAIL });
    }
  };

export const checkIfTokenIsValid = () => async (dispatch) => {
  try {
    const jwt = await storageGetItem("jwt");
    const url = `/api/tenants/me`;
    const response = await api.get(url);
    const { data } = response;
    dispatch({ type: CHECK_TOKEN_SUCCESS, payload: { jwt, data } });
  } catch (err) {
    dispatch({ type: CHECK_TOKEN_FAIL, payload: err });
  } finally {
    dispatch({ type: SET_HIDE_LOADER });
  }
};

export const logout = () => async (dispatch) => {
  await storageDeleteItem("jwt");
  dispatch({ type: LOGOUT });
};

export const resetError = () => (dispatch) => {
  dispatch({ type: RESET_ERROR });
};

export const showLoader = () => (dispatch) => {
  dispatch({ type: SET_SHOW_LOADER });
};

export const hideLoader = () => (dispatch) => {
  dispatch({ type: SET_HIDE_LOADER });
};
