import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../../../constants/styles";
import TransactionCard from "../../Common/TransactionCard";
import { ScrollView } from "react-native-gesture-handler";
import { AllOnWallet } from "../../../utils/interface";
import moment from "moment";

type Props = {
  transactions: AllOnWallet["transactions"];
};

const Transactions: React.FC<Props> = ({ transactions }) => {
  const transactionMap: Record<string, AllOnWallet["transactions"]> = {};

  transactions.forEach((transaction) => {
    const date =
      transaction.status === "PENDING" || !transaction.date_completed
        ? transaction.date_initialized
        : transaction.date_completed;

    const day = moment(date).format("Do MMMM YYYY");
    if (transactionMap[day]) {
      transactionMap[day].push(transaction);
    } else {
      transactionMap[day] = [transaction];
    }
  });

  return (
    <View className="">
      <View className="flex-row p-4 justify-between items-center">
        <Text
          className="text-base text-mainBlack "
          style={[globalStyles.semibold_text]}
        >
          Recent Transactions
        </Text>
        <Text
          className="text-sm text-secondaryTwo  "
          style={[globalStyles.semibold_text]}
        >
          See all
        </Text>
      </View>
      <ScrollView className="px-4 py-1 ">
        <View
          className="w-full pb-20 "
          style={{
            rowGap: 20,
          }}
        >
          {Object.keys(transactionMap).map((key, index) => (
            <View key={index} className="w-full gap-y-3">
              <View className="flex-row justify-between items-center">
                <Text
                  className="text-xs text-mainBlack "
                  style={[globalStyles.semibold_text]}
                >
                  {key}
                </Text>
              </View>
              <View
                className="w-full "
                style={{
                  rowGap: 16,
                }}
              >
                {transactionMap[key].map((transaction, index) => (
                  <TransactionCard key={index} {...transaction} />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Transactions;
