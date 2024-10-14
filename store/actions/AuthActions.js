import { AUTHORIZE_USER } from "../constants/AuthConstants";
import api from "../../service/service";
import { storageSetItem } from "../../tools/secureStore";

export const authorizeUser = (cb) => async (dispatch) => {
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
  } finally {
    await cb();
  }
};
