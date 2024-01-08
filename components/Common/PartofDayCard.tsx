import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import moment from "moment";

type Props = {
  icon: React.JSX.Element;
  part_of_day: string;
  time: string;
  quantity: number;
};

const PartofDayCard: React.FC<Props> = ({
  icon,
  time,
  quantity,
  part_of_day,
}) => {
  return (
    <View className="space-y-2">
      <View className="w-full flex-row justify-center items-center space-x-[7px] ">
        {icon}
        <Text
          className="text-base text-secondaryTwo "
          style={[globalStyles.semibold_text]}
        >
          {part_of_day}
        </Text>
      </View>
      <View className="px-[19px] py-[21px] bg-primaryGray rounded-lg ">
        <View className="py-3 px-[18px] w-full rounded-lg bg-white flex-row justify-between items-center ">
          <Text
            className="text-base text-mainBlack "
            style={[globalStyles.semibold_text]}
          >
            {moment(time).format("LT")}
          </Text>
          <Text
            className="text-sm text-neutral "
            style={[globalStyles.semibold_text]}
          >
            Quantity: {quantity}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PartofDayCard;
