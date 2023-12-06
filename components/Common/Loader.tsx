import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View className="flex-1 items-center bg-white justify-center">
      <ActivityIndicator size="large" color="#8863F2" />
    </View>
  );
};

export default Loader;
