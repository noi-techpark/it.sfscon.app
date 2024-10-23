import store from "../store/store";
import { storageGetItem } from "../tools/secureStore";
import axios from "axios";

axios.interceptors.request.use(async (config) => {
  const server = "https://m.opencon.prc";
  const jwt = await storageGetItem("jwt");

  const configData = {
    ...config,
    baseURL: server,
  };

  if (!jwt) {
    return configData;
  }

  return {
    ...configData,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${jwt}`,
    },
  };
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    try {
      const status = error?.response?.request?.status;
      const { readFromBackupServer } = await import(
        "../store/actions/AppActions"
      );
      if (status === 502) {
        await store.dispatch(readFromBackupServer());
      }
      return Promise.reject(error);
    } catch (dispatchError) {
      return Promise.reject(dispatchError);
    }
  }
);

export default axios;
