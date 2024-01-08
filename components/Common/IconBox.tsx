import { View, Text, StyleProp, TextStyle, ViewStyle } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";

type Props = {
  text: string;
  icon: React.JSX.Element;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

const IconBox: React.FC<Props> = ({ text, textStyle, style, icon }) => {
  return (
    <View
      className="flex flex-row  items-center rounded-full py-1 px-3 pr-4 space-x-1 bg-[#FFFAE7]"
      style={[style]}
    >
      <View className=" flex justify-center items-center ">{icon}</View>
      <Text
        className="text-[11px]  text-secondarySix"
        style={[globalStyles.semibold_text, textStyle]}
      >
        {text}
      </Text>
    </View>
  );
};

export default IconBox;
