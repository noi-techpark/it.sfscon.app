import { AUTHORIZE_USER } from "../constants/AuthConstants";
import api from "../../service/service";
import { storageGetItem, storageSetItem } from "../../tools/secureStore";

export const authorize = () => async (dispatch) => {
  try {
    const url = `/api/authorize`;
    const response = await api.get(url);

    const {
      data: { token },
    } = response;

    await storageSetItem("jwt", token);
    dispatch({ type: AUTHORIZE_USER, payload: token });
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTHORIZE_USER, payload: "dummy" });
    console.log("OVAJ JE ERROR", error);
  }
};

export const authorizeUser = () => async (dispatch) => {
  try {
    const jwt = await storageGetItem("jwt");

    if (!jwt) return dispatch(authorize());

    const tokenIsValid = await checkIfTokenIsValid();

    if (!tokenIsValid) return dispatch(authorize());

    dispatch({ type: AUTHORIZE_USER, payload: jwt });
  } catch {}
};

export const checkIfTokenIsValid = async () => {
  try {
    const url = "/api/me";
    const user = await api.get(url);
    const { data } = user;
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};
