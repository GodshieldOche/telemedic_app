import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../../../constants/styles";
import NoRecordFound from "../../Common/NoRecordFound";

const Appointments = () => {
  return (
    <View className="flex-1">
      <View className="flex-row justify-between px-4">
        <Text
          className="text-base pt-4 text-mainBlack "
          style={[globalStyles.semibold_text]}
        >
          Appointments
        </Text>
        <Text
          className="text-sm pt-4 text-secondaryTwo "
          style={[globalStyles.semibold_text]}
        >
          See all
        </Text>
      </View>
      <NoRecordFound
        text="No  Appointment"
        styles={{ width: 140, height: 120 }}
      />
    </View>
  );
};

export default Appointments;
