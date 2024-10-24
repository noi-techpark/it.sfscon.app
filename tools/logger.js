import axios from "axios";

export const logger = async (obj) => {
  try {
    const url = "https://logger.digitalcube.dev";
    await axios.post(url, obj);
  } catch (error) {
    console.log(error);
  }
};
