import Constants from "expo-constants";

const getServer = function () {
  const installation =
    Constants.manifest2?.extra?.expoClient?.extra?.installation;
  switch (installation) {
    case "test":
      return "https://webadmin.app.sfscon.testingmachine.eu";
    default:
      return "https://webadmin.app.sfscon.testingmachine.eu";
  }
};
export const server = getServer();
