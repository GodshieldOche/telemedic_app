import { View, Text, Image } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { Iconify } from "react-native-iconify";
import IconBox from "./IconBox";

const ReviewCard = () => {
  return (
    <View
      className="px-4 py-5 w-[auto] border border-secondaryFive rounded-[10px]  "
      style={{ rowGap: 16 }}
    >
      <View className="flex flex-row items-start space-x-7">
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
              className="text-mainBlack"
              style={[globalStyles.semibold_text, globalStyles.normal_text]}
            >
              Dr. Victor Emmanuel
            </Text>
            <Text
              className="text-[13px] text-mainGray "
              style={[globalStyles.regular_text]}
            >
              1 day ago
            </Text>
          </View>
        </View>
        <IconBox
          icon={
            <Iconify icon="line-md:star-alt-filled" size={18} color="#F5AF44" />
          }
          text="4.5"
        />
      </View>
      <Text
        className="text-[13px] max-w-[275px] text-secondarySix "
        style={[globalStyles.regular_text]}
      >
        Many thanks to Dr. victor. he is a professional, competent doctor
      </Text>
    </View>
  );
};

export default ReviewCard;
