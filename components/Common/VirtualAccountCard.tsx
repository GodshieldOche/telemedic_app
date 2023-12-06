import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../constants/styles";
import { Iconify } from "react-native-iconify";
import { copyToClipboard } from "../../utils/helper";

type Props = {
  id: string;
  account_number: string;
  bank_name: string;
  account_name: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const VirtualAccountCard: React.FC<Props> = ({
  account_name,
  account_number,
  bank_name,
  setVisible,
}) => {
  const handleCopyToClipboard = async () => {
    await copyToClipboard(account_number);
    setVisible(true);
  };

  return (
    <View className="bg-primaryOne rounded-2xl ">
      <ImageBackground
        className="px-4 py-3 space-y-3 "
        source={require("../../assets/images/medic_bg_one.png")}
      >
        <View className="flex flex-row justify-between">
          <Text
            className="text-white text-[15px]"
            style={[globalStyles.meduim_text]}
          >
            Virtual Account
          </Text>
          <Text
            className="text-white text-[15px]"
            style={[globalStyles.meduim_text]}
          >
            {bank_name}
          </Text>
        </View>
        <View className="w-full">
          <View className="w-[60%] flex-row items-center justify-between py-2 px-[18px] bg-purpleDark rounded-md ">
            <Text
              className="text-white text-[15px] "
              style={[globalStyles.meduim_text]}
            >
              {account_number}
            </Text>
            <Pressable
              onPress={handleCopyToClipboard}
              className="h-9 w-9 bg-white border border-primaryOne/90 justify-center items-center rounded-md "
            >
              <Iconify icon="solar:copy-bold" color="#8863F2" />
            </Pressable>
          </View>
        </View>
        <View className="w-full items-end">
          <Text
            className="text-white text-[15px]"
            style={[globalStyles.meduim_text]}
          >
            {account_name}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default VirtualAccountCard;
