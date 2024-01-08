import { View, Text, Pressable } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { router } from "expo-router";
import { Service } from "../../utils/interface";

const IconText: React.FC<Service> = ({
  icon,
  text,
  route,
  iconContainerStyles,
  params,
  action,
  isLink = true,
}) => {
  return (
    <Pressable
      onPress={() => (isLink ? router.push(route) : action?.())}
      className="mt-1"
    >
      <View className="space-y-[5px] flex w-[81px] justify-center items-center">
        <View
          style={iconContainerStyles}
          className="py-5 rounded-[12px] w-[65px] flex justify-center items-center  bg-secondaryOne "
        >
          {icon}
        </View>
        <Text
          className="text-secondaryTwo text-center text-[11px]"
          style={[globalStyles.meduim_text]}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default IconText;
