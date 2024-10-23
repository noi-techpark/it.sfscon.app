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
    dispatch({ type: AUTHORIZE_USER, payload: token });
  } catch (error) {
    dispatch({ type: AUTHORIZE_USER, payload: "dummy" });
  }
};

export const authorizeUser = () => async (dispatch) => {
  try {
    const jwt = await storageGetItem("jwt");

    if (!jwt) return dispatch(authorize());

    const tokenIsValid = await checkIfTokenIsValid();

    if (!tokenIsValid) return dispatch(authorize());

    dispatch({ type: AUTHORIZE_USER, payload: jwt });
  } catch (error) {
    dispatch({ type: AUTHORIZE_USER, payload: "dummy" });
  }
};

export const checkIfTokenIsValid = async () => {
  try {
    const url = "/api/me";
    const user = await api.get(url);
    const { data } = user;
    return data;
  } catch (error) {
    console.log(error);
  }
};
