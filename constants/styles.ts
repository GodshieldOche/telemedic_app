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
  codeFiledRoot: { marginTop: 20 },
  cell: {
    width: 56,
    height: 56,
    lineHeight: 54,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E4E5E7",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#2B2B2B",
  },
  focusCell: {
    borderColor: "#8863F2",
  },
  big_text: {
    fontSize: 23,
  },
  normal_text: {
    fontSize: 16,
  },
});

export const options: any = {
  headerTitleAlign: "center",
  headerShadowVisible: false,
  headerTitleStyle: {
    fontFamily: "Nunito_Semibold",
    fontSize: 18,
    fontWeight: "600",
    color: "#2B2B2B",
  },
  headerTintColor: "#2B2B2B",
  headerBackTitleVisible: false,
};
