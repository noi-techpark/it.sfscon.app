const common = {
  primary: "#3EB5F8",
  inputTextColor: "rgba(0, 0, 0, 0.8)",
  inputBackgroundDarker: "rgba(0, 0, 0, 0.15)",
  primaryButtonBackgroundColor: "#73C4EF",
  primaryButtonTextColor: "#FFF",
  textAreaBackgroundColor: "#FFF",
  bottomTabNavActive: "#3EB5F8",
  avatarContainer: "rgba(0, 0, 0, 0.05)",
  bottomTabNavInactive: "rgba(0, 0, 0, 0.8)",
  secondaryButtonBackgroundColor: "#F0F8FD",
  secondaryButtonTextColor: "#3EB5F8",
  inputErrorBorderColor: "#EB5757",
  inputErrorMessage: "#EB5757",
  ratingDefault: "rgba(0, 0, 0, 0.1)",
  ratingSelected: "#FEC82E",
};

const darkTheme = {
  ...common,
  backgroundColor: "#0E0E0E",
  inputBackground: "rgba(255, 255, 255, 0.85)",
  buttonTextColor: "#FFF",
  title: "#FFF",
  secondaryTitle: "#3EB5F8",
  text: "rgba(255, 255, 255, 0.85)",
  divider: "rgba(255, 255, 255, 0.5)",
  modalBackgroundColor: "#313131",
  modalCoverBackgroundColor: "rgba(12, 12, 12, 0.8)",
};
const lightTheme = {
  ...common,
  backgroundColor: "#FFF",
  buttonTextColor: "#000",
  inputBackground: "rgba(0, 0, 0, 0.03)",
  disabledBackground: "#F2F2F2",
  disabledText: "rgba(0, 0, 0, 0.4)",
  title: "#000",
  secondaryTitle: "#73C4EF",
  text: "rgba(0, 0, 0, 0.85)",
  textMedium: "rgba(0, 0, 0, 0.7)",
  textLight: "rgba(0, 0, 0, 0.36)",
  textHTML: "rgba(0, 0, 0, 0.6)",
  modalBackgroundColor: "#FFFFFF",
  modalCoverBackgroundColor: "rgba(0, 0, 0, 0.21)",
  divider: "#000",
  backgroundLight: "rgba(140, 202, 237, 0.13)",
};

export const colors = { light: lightTheme, dark: darkTheme };
