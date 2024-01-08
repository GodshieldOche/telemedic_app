import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import { useLocalSearchParams } from "expo-router";
import { getTransaction } from "../../../../redux/slices/user/wallet";
import Loader from "../../../../components/Common/Loader";
import { ImageBackground } from "expo-image";
import { globalStyles } from "../../../../constants/styles";
import moment from "moment";
import { truncate } from "lodash";
import Button from "../../../../components/Common/Button";

const TransactionDetails = () => {
  const { transactionLoading, transaction } = useAppSelector(
    (state) => state.wallet
  );
  const { id } = useLocalSearchParams<{ id: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getTransaction({ id, signal }));

    return () => {
      controller.abort();
    };
  }, [id]);

  if (transactionLoading || !transaction) {
    return <Loader />;
  }

  return (
    <View className="flex-1 py-3 bg-borderGray">
      <ScrollView className="   flex-1">
        <View className="space-y-6">
          <View className="h-[700px] w-full px-4  relative ">
            <View className="w-full h-full flex-1 rounded-2xl bg-white">
              {/* Top */}
              <View className="flex-[0.25] ">
                {/* Top Background Image */}
                <ImageBackground
                  source={require("../../../../assets/images/receipt.png")}
                  contentFit="contain"
                  contentPosition={{ top: 0, left: 0, right: 0 }}
                  style={{ width: "100%", height: "100%" }}
                  className="justify-center items-center flex-1"
                >
                  <View className="space-y-3">
                    <Text
                      className="text-xl text-secondarySix "
                      style={[globalStyles.bold_text]}
                    >
                      Transaction Receipt
                    </Text>
                    <View className="items-center space-y-1">
                      <Text
                        className="text-base text-secondarySix "
                        style={[globalStyles.semibold_text]}
                      >
                        {transaction.title}
                      </Text>
                      <Text
                        className="text-2xl text-primaryOne "
                        style={[globalStyles.bold_text]}
                      >
                        {transaction.symbol}
                        {transaction.amount.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
              {/* Bottom */}
              <View className="flex-[0.75] space-y-9">
                <View className="space-y-[25px] mt-6">
                  <View className=" border border-dashed border-[#C8CCD0] "></View>
                  <View
                    className="px-3"
                    style={{
                      rowGap: 20,
                    }}
                  >
                    <TitleValue
                      title="Recipient"
                      value={
                        transaction.recipient ? transaction.recipient : "You"
                      }
                    />
                    <TitleValue
                      title="Sender"
                      value={transaction.sender ? transaction.sender : "You"}
                    />
                  </View>
                  <View className=" border border-dashed border-[#C8CCD0] "></View>
                </View>
                <View className="px-3 space-y-11">
                  <View
                    style={{
                      rowGap: 24,
                    }}
                  >
                    <TitleValue
                      title="Transaction Date"
                      value={moment(transaction.date).format("llll")}
                    />
                    <TitleValue
                      title="Transaction Type"
                      value={transaction.type}
                    />
                    <TitleValue
                      title="Transaction Ref."
                      value={truncate(transaction.transaction_reference, {
                        length: 20,
                      })}
                    />
                    <TitleValue
                      title="Session ID"
                      value={truncate(transaction.session_id, {
                        length: 20,
                      })}
                    />
                    <TitleValue title="Status" value={transaction.status} />
                  </View>
                  <Text
                    className="text-xs text-primaryBlue "
                    style={[globalStyles.regular_text]}
                  >
                    For enquiries / support, email us hello@medicare.com
                  </Text>
                </View>
              </View>
            </View>
            {/* Main Background Image */}
            <View className="absolute -bottom-3 left-0 right-0 h-[75%]  ">
              <ImageBackground
                source={require("../../../../assets/images/rn_dots.png")}
                contentFit="fill"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>
          <View className="flex-row justify-between items-center px-4">
            <View className="w-[46%]">
              <Button text="Download" action={() => {}} />
            </View>

            <View className="w-[46%]">
              <Button text="Share" action={() => {}} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TransactionDetails;

const TitleValue: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <View className="flex-row justify-between items-center ">
      <Text
        className="text-sm text-neutral "
        style={[globalStyles.regular_text]}
      >
        {title} :
      </Text>
      <Text
        className="text-sm text-mainBlack "
        style={[globalStyles.regular_text]}
      >
        {value}
      </Text>
    </View>
  );
};
