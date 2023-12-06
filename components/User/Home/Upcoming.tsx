import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../../../constants/styles";
import AppointmentCard from "../../Common/AppointmentCard";
import { FlatList } from "react-native-gesture-handler";

const Upcoming = () => {
  return (
    <View style={{ rowGap: 12 }}>
      <View className="flex px-4 flex-row justify-between items-center">
        <Text
          className="text-mainBlack"
          style={[globalStyles.semibold_text, globalStyles.normal_text]}
        >
          Upcoming Appointments
        </Text>
        <Text
          className="text-sm text-secondaryTwo"
          style={[globalStyles.semibold_text]}
        >
          See more
        </Text>
      </View>
      <FlatList
        data={["1", "2", "3"]}
        renderItem={({ item, index }) => <AppointmentCard key={index} />}
        horizontal
        contentContainerStyle={{
          columnGap: 12,
          paddingHorizontal: 16,
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Upcoming;
