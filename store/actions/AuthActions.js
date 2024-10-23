import { AUTHORIZE_USER } from "../constants/AuthConstants";
import api from "../../service/service";
import { storageGetItem, storageSetItem } from "../../tools/secureStore";

export const authorize = () => async (dispatch) => {
  try {
    const url = "/api/authorize";
    const response = await api.post(url);

    const {
      data: { token },
    } = response;

    await storageSetItem("jwt", token);
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: AUTHORIZE_USER });
  }
};

export const authorizeUser = () => async (dispatch) => {
  try {
    const jwt = await storageGetItem("jwt");

    if (!jwt) return dispatch(authorize());

    const tokenIsValid = await dispatch(checkIfTokenIsValid());

    if (!tokenIsValid) return dispatch(authorize());

    dispatch({ type: AUTHORIZE_USER });
  } catch (error) {
    dispatch({ type: AUTHORIZE_USER });
  }
};

export const checkIfTokenIsValid = () => async (dispatch) => {
  try {
    const url = "/api/me";
    const user = await api.get(url);
    const { data } = user;
    return data;
  } catch (error) {
    dispatch(authorize());
  }
};
