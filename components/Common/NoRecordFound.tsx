import { View, Text, StyleProp } from "react-native";
import React from "react";
import { Image, ImageStyle } from "expo-image";
import { globalStyles } from "../../constants/styles";

type Props = {
  text?: string;
  styles?: StyleProp<ImageStyle>;
};

const NoRecordFound: React.FC<Props> = ({
  text = "No Record found",
  styles,
}) => {
  return (
    <View className=" flex-1 items-center py-12">
      <Image
        source={require("../../assets/images/no_result.png")}
        className="w-[320px] h-[280px]"
        style={[styles]}
      />
      <Text
        className="text-mainBlack text-center text-base"
        style={[globalStyles.regular_text]}
      >
        {text}
      </Text>
    </View>
  );
};

export default NoRecordFound;
