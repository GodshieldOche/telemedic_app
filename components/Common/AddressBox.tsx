import { View, Text, StyleProp, TextStyle, ViewStyle } from "react-native";
import React from "react";
import { Iconify } from "react-native-iconify";
import { globalStyles } from "../../constants/styles";

interface Props {
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  color?: string;
  address: string;
}

const AddressBox: React.FC<Props> = ({
  color = "#858C94",
  style,
  textStyle,
  address,
}) => {
  return (
    <View className="flex flex-row items-center space-x-1" style={[style]}>
      <Iconify icon="fluent:location-16-filled" color={color} size={14} />
      <Text
        className="text-[13px] text-mainGray "
        style={[globalStyles.regular_text, textStyle]}
      >
        {address}
      </Text>
    </View>
  );
};

export default AddressBox;
