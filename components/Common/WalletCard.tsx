import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";

type Props = {
  title: string;
  description: string;
  icon: React.JSX.Element;
  amount: number;
  symbol: string;
};

const WalletCard: React.FC<Props> = ({
  title,
  description,
  icon,
  amount,
  symbol,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View className="px-4" style={{ width: width }}>
      <View className="w-full bg-white py-2 px-4 rounded-lg  divide-y divide-primaryOne/20 ">
        <View className="flex flex-row items-center space-x-3 w-full pb-3 ">
          <View className="w-9 h-9 rounded-full justify-center items-center border border-primaryOne/70 ">
            {icon}
          </View>
          <View>
            <Text
              className="text-secBlack"
              style={[globalStyles.semibold_text, globalStyles.normal_text]}
            >
              {title}
            </Text>
            <Text
              className="text-secBlack text-xs"
              style={[globalStyles.regular_text]}
            >
              {description}
            </Text>
          </View>
        </View>
        <View className="pt-3">
          <Text
            className="text-secBlack text-xl"
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

export default WalletCard;
