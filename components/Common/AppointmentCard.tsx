import { View, Text, Image } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { Iconify } from "react-native-iconify";

const DateText = () => {
  return (
    <View className="flex flex-row space-x-1  items-center">
      <Iconify icon="ic:round-date-range" size={18} color="#F2EFFF" />
      <Text
        className="text-sm text-primaryTwo "
        style={[globalStyles.regular_text]}
      >
        Mon, July 29
      </Text>
    </View>
  );
};
const TimeText = () => {
  return (
    <View className="flex flex-row space-x-1  items-center">
      <Iconify icon="ic:sharp-timelapse" size={18} color="#F2EFFF" />
      <Text
        className="text-sm text-primaryTwo "
        style={[globalStyles.regular_text]}
      >
        11:00-12:00 am
      </Text>
    </View>
  );
};

const AppointmentCard = () => {
  return (
    <View
      className="px-4 py-5 w-[auto] rounded-[10px] bg-primaryOne  "
      style={{ rowGap: 16 }}
    >
      <View className="flex flex-row space-x-[70px] justify-between ">
        <View className="flex flex-row space-x-2 ">
          <Image
            source={require("../../assets/images/male_avata.png")}
            style={{
              width: 51,
              height: 51,
              borderRadius: 9999,
              objectFit: "cover",
            }}
          />
          <View className="space-y-1">
            <Text
              className="text-white"
              style={[globalStyles.semibold_text, globalStyles.normal_text]}
            >
              Dr. Victor Emmanuel
            </Text>
            <Text
              className="text-[13px] text-secondaryThree "
              style={[globalStyles.regular_text]}
            >
              Family medicine
            </Text>
          </View>
        </View>
        <Iconify icon="radix-icons:dots-vertical" size={16} color="#fff" />
      </View>
      <View className=" flex  flex-row  ">
        <View
          className="px-3 py-2 bg-secondaryFour flex flex-row items-center  rounded-lg "
          style={{
            columnGap: 17,
          }}
        >
          <DateText />
          <TimeText />
        </View>
      </View>
    </View>
  );
};

export default AppointmentCard;
