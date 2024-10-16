import { storageGetItem } from "../tools/secureStore";
import axios from "axios";
import { API_URL } from "@env";

axios.interceptors.request.use(
  async (config) => {
    const server = API_URL || "https://m.opencon.dev";
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
  },
  (error) => Promise.reject(error)
);

export default axios;
