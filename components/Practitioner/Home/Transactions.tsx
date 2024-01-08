import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../../../constants/styles";
import NoRecents from "../../Common/NoRecents";

const Transactions = () => {
  return (
    <View className="flex-1">
      <View className="flex-row justify-between px-4">
        <Text
          className="text-base pt-4 text-mainBlack "
          style={[globalStyles.semibold_text]}
        >
          Recent Transactions
        </Text>
        <Text
          className="text-sm pt-4 text-secondaryTwo "
          style={[globalStyles.semibold_text]}
        >
          See all
        </Text>
      </View>
      <NoRecents />
    </View>
  );
};

export default Transactions;
