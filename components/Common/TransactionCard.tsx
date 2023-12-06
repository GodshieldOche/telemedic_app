import { View, Text } from "react-native";
import React from "react";
import { Inflow, Outflow } from "./svgs";
import { globalStyles } from "../../constants/styles";
import moment from "moment";

type Props = {
  title: string;
  name: string;
  type: "inflow" | "outflow";
  method: string;
  date_initialized: string;
  date_completed?: string;
  amount: number;
  status: string;
  currency: string;
  symbol: string;
};

const types = {
  inflow: <Inflow />,
  outflow: <Outflow />,
};

const TransactionCard: React.FC<Props> = ({
  title,
  name,
  type,
  date_completed,
  date_initialized,
  amount,
  status,
  symbol,
}) => {
  const date =
    status === "PENDING" || !date_completed ? date_initialized : date_completed;
  return (
    <View className="w-full flex-row items-center py-1  ">
      <View className="w-[16%]">
        <View className="w-9 h-9 bg-secGreen justify-center items-center rounded-md ">
          {types[type]}
        </View>
      </View>

      <View className="flex flex-row w-[84%]  justify-between">
        <View className="gap-y-[2px]">
          <Text
            className="text-mainBlack text-base "
            style={[globalStyles.semibold_text]}
          >
            {name}
          </Text>
          <Text
            className="text-xs text-mainGray "
            style={[globalStyles.regular_text]}
          >
            {title}
          </Text>
        </View>
        <View className="gap-y-2">
          <Text
            className="text-xs w-full text-mainBlack text-right "
            style={[globalStyles.regular_text]}
          >
            {moment(date).format("LT")}
          </Text>
          <Text
            className=" text-base text-primaryGreen text-end "
            style={[globalStyles.semibold_text]}
          >
            {symbol}
            {amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionCard;
