import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../../../constants/styles";
import { FlatList } from "react-native-gesture-handler";
import IconText from "../../Common/IconText";
import { services } from "../../../utils/data";

const Services = () => {
  return (
    <View
      style={{
        rowGap: 12,
      }}
    >
      <View className="px-4">
        <Text
          className="text-mainBlack"
          style={[globalStyles.semibold_text, globalStyles.normal_text]}
        >
          Nearest Service
        </Text>
      </View>
      <FlatList
        data={services}
        renderItem={({ item, index }) => (
          <IconText
            icon={item.icon}
            text={item.text}
            route={item.route}
            key={index}
            iconContainerStyles={item.iconContainerStyles}
          />
        )}
        horizontal
        contentContainerStyle={{
          columnGap: 8,
          paddingHorizontal: 8,
          alignItems: "flex-start",
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Services;
