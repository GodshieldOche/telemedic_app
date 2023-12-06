import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { Link } from "expo-router";
import { Service } from "../../utils/interface";

const IconText: React.FC<Service> = ({
  icon,
  text,
  route,
  iconContainerStyles,
  params,
}) => {
  return (
    <Link
      href={{
        pathname: route,
        params: params,
      }}
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
    </Link>
  );
};

export default IconText;
