import axios from "axios";

export const logger = async (message) => {
  try {
    const url = "https://logger.digitalcube.dev";
    await axios.post(url, { message: JSON.stringify(message) });
  } catch (error) {
    console.log(error);
  }
};
