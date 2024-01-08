import { View, Text } from "react-native";
import React from "react";
import { Iconify } from "react-native-iconify";
import { globalStyles } from "../../constants/styles";

const NoRecents = () => {
  return (
    <View className="flex-1 justify-center space-y-2 items-center">
      <Iconify icon="tabler:mood-smile-filled" size={48} color="#8863F2" />
      <Text
        className="text-mainBalck text-base "
        style={[globalStyles.regular_text]}
      >
        No Recent Transaction
      </Text>
    </View>
  );
};

export default NoRecents;
