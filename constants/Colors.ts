import { StyleSheet } from "react-native";

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};

export const globalStyles = StyleSheet.create({
  bold_text: {
    fontWeight: "bold",
    fontFamily: "Nunito_Bold",
  },
  semibold_text: {
    fontWeight: "600",
    fontFamily: "Nunito_Semibold",
  },
  meduim_text: {
    fontWeight: "500",
    fontFamily: "Nunito_Meduim",
  },
  regular_text: {
    fontWeight: "400",
    fontFamily: "Nunito",
  },
});
