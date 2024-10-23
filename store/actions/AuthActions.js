import { AUTHORIZE_USER } from "../constants/AuthConstants";
import api from "../../service/service";
import { storageGetItem, storageSetItem } from "../../tools/secureStore";
import { logger } from "../../tools/logger";

export const authorize = () => async (dispatch) => {
  try {
    const url = "/api/authorize";
    const response = await api.post(url);

    const {
      data: { token },
    } = response;

    await storageSetItem("jwt", token);
  } catch (error) {
  } finally {
    dispatch({ type: AUTHORIZE_USER });
  }
};

export const authorizeUser = () => async (dispatch) => {
  try {
    const jwt = await storageGetItem("jwt");

    if (!jwt) return dispatch(authorize());

    dispatch(checkIfTokenIsValid());
  } catch (error) {
    dispatch({ type: AUTHORIZE_USER });
  }
};

export const checkIfTokenIsValid = () => async (dispatch) => {
  try {
    const url = "/api/me";
    await api.get(url);
    dispatch({ type: AUTHORIZE_USER });
  } catch (error) {
    dispatch(authorize());
  }
};
