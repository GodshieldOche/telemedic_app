import { View, Text, TextInput, Platform } from "react-native";
import React from "react";
import { Iconify } from "react-native-iconify";
import { globalStyles } from "../../constants/styles";

const SearchInput = () => {
  return (
    <View className="flex flex-row w-full relative justify-between items-center bg-primaryGray py-[10px] px-4 rounded-lg">
      <Iconify icon="ic:round-search" size={24} color="#858C94" />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#858C94"
        className="text-mainBlack"
        style={[
          globalStyles.regular_text,
          {
            width: "80%",
            paddingVertical: Platform.OS === "ios" ? 6 : 2,
            fontSize: 13,
          },
        ]}
      />
      <Iconify icon="ion:filter" size={20} color="#8863F2" />
    </View>
  );
};

export default SearchInput;
