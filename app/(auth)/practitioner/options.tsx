import { View, Text } from "react-native";
import React from "react";
import IconTextBox from "../../../components/Common/IconTextBox";
import { globalStyles } from "../../../constants/styles";
import { router } from "expo-router";

const KycOptions = () => {
  return (
    <View className="py-6 px-4 bg-white flex-1 space-y-6 ">
      <View className="justify-center items-center px-4 space-y-2 ">
        <Text
          className="text-[23px] text-center"
          style={[globalStyles.semibold_text]}
        >
          Select means of identification
        </Text>
        <Text
          className="text-sm text-[#545D69] text-center"
          style={[globalStyles.regular_text]}
        >
          To complete registration you have to take a selfie and upload a
          document for user verification
        </Text>
      </View>
      <View
        className=" h-fit w-full bg-primaryGray px-4 py-5 rounded-lg space-y-5"
        style={{
          flexDirection: "column",
          rowGap: 16,
        }}
      >
        <IconTextBox
          title="NIN"
          action={() => router.push("/practitioner/nin")}
        />
        <IconTextBox
          title="International Passport"
          action={() => router.push("/practitioner/international_passport")}
        />
        <IconTextBox
          title="Driving Licence"
          action={() => router.push("/practitioner/driving_licence")}
        />
      </View>
    </View>
  );
};

export default KycOptions;
