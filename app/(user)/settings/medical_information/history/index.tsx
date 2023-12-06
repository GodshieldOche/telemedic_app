import { View, Text } from "react-native";
import React from "react";
import EmptyButtonView from "../../../../../components/Common/EmptyButtonView";

const MedicalHistory = () => {
  return (
    <View
      className="flex-1  py-4  bg-white"
      style={{
        rowGap: 24,
      }}
    >
      <EmptyButtonView
        title="You have not added any Medical History"
        text="Add a New Medical History"
        action={() => {}}
      />
    </View>
  );
};

export default MedicalHistory;
