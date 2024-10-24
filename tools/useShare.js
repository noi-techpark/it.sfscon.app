import Share from "react-native-share";

export const useShare = () => {
  const share = async ({ url, title, message }) => {
    try {
      await Share.open({
        url: url,
        title: title || "",
        message: message || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { share };
};
