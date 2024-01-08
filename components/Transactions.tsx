import { View, Text, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { globalStyles } from "../constants/styles";
import TransactionCard from "./Common/TransactionCard";
import { FlatList } from "react-native-gesture-handler";
import { AllOnWallet } from "../utils/interface";
import moment from "moment";

type Props = {
  transactions: AllOnWallet["transactions"];
  style?: StyleProp<ViewStyle>;
  handleEndReached?: () => void;
};

const Transactions: React.FC<Props> = ({ transactions, handleEndReached }) => {
  const transactionMap: Record<string, AllOnWallet["transactions"]> = {};

  transactions?.forEach((transaction) => {
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
    <>
      <FlatList
        data={Object.keys(transactionMap)}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="w-full space-y-3">
            <View className="flex-row justify-between items-center">
              <Text
                className="text-xs text-mainBlack "
                style={[globalStyles.semibold_text]}
              >
                {item}
              </Text>
            </View>
            <View
              className="w-full "
              style={{
                rowGap: 16,
              }}
            >
              {transactionMap[item].map((transaction, index) => (
                <TransactionCard key={index} {...transaction} />
              ))}
            </View>
          </View>
        )}
        className="px-4 flex-1 py-1"
        contentContainerStyle={{
          rowGap: 20,
          paddingBottom: 24,
        }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
      />
    </>
  );
};

export default Transactions;
