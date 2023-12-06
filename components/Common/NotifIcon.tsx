import { View, Text } from "react-native";
import React from "react";
import { Iconify } from "react-native-iconify";

type Props = {
  icon?: React.JSX.Element;
};

const NotifIcon: React.FC<Props> = ({
  icon = <Iconify icon="mdi:bell" size={24} color="#6D7580" />,
}) => {
  return (
    <View className="relative  ">
      {icon}
      <View className="w-2 h-2 absolute bg-[#DA1414] rounded-full -right-[2px] -top-[2px] "></View>
    </View>
  );
};

export default NotifIcon;
