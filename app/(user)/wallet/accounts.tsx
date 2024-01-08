import { View, Text } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Iconify } from "react-native-iconify";
import { globalStyles } from "../../../constants/styles";
import VirtualAccountCard from "../../../components/Common/VirtualAccountCard";
import { useAppSelector } from "../../../hooks/useDispatch";
import { router } from "expo-router";
import { Toast } from "react-native-ui-lib";

const Accounts = () => {
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);

  const { data } = useAppSelector((state) => state.wallet);

  if (!data) {
    return router.push("/(user)/(tabs)/wallet");
  }

  return (
    <View
      className="flex-1 bg-white"
      style={{
        paddingBottom: insets.bottom,
      }}
    >
      <Toast
        visible={visible}
        position={"top"}
        autoDismiss={3000}
        message="Copied to clipboard"
        onDismiss={() => setVisible(false)}
      />
      <ScrollView className=" py-6 px-4  flex-1">
        <View className="space-y-6">
          <View className="w-full bg-primaryTwo justify-center items-center rounded-xl py-3 px-4 ">
            <View className="space-y-3">
              <View className="justify-center items-center space-y-1">
                <View className="w-9 h-9 border border-primaryOne/80 justify-center items-center rounded-md ">
                  <Iconify icon="ph:bell-ringing-fill" color="#8863F2" />
                </View>
                <Text
                  className="text-base font-semibold text-primaryOne "
                  style={[globalStyles.semibold_text]}
                >
                  Fund Tips
                </Text>
              </View>
              <Text
                className="text-sm text-secBlack text-center "
                style={[globalStyles.meduim_text]}
              >
                To fund your wallet, make a transfer to any of the following
                account numbers.
              </Text>
            </View>
          </View>
          <View
            style={{
              rowGap: 24,
            }}
          >
            {data?.accounts?.map((account) => (
              <VirtualAccountCard
                key={account.id}
                setVisible={setVisible}
                {...account}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Accounts;
