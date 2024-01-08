import { View, Text, FlatList, Animated, Pressable } from "react-native";
import React, { useRef } from "react";
import { globalStyles } from "../../../constants/styles";
import NotifIcon from "../../Common/NotifIcon";
import { Iconify } from "react-native-iconify";
import WalletCard from "../../Common/WalletCard";
import Paginator from "../../Onboarding/Paginator";
import { AllOnWallet } from "../../../utils/interface";
import { EmptyWallet, Locked } from "../../Common/svgs";
import { LinkProps, router } from "expo-router";

type Props = {
  data: AllOnWallet["wallet"];
};

const Header: React.FC = () => {
  const slidesRef = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const slides = [
    {
      title: "Main Balance",
      description: "Your Available Balance",
      icon: <EmptyWallet />,
      amount: 0.0,
      symbol: "$",
    },
    {
      title: "Locked Balance",
      description: "Unlocked after a successful session",
      icon: <Locked />,
      amount: 0.0,
      symbol: "$",
    },
  ];

  return (
    <View className="space-y-4">
      <View className="flex flex-row w-full px-4 items-start justify-between">
        <View className="flex space-y-1">
          <Text
            className="text-2xl text-mainWhite"
            style={[globalStyles.semibold_text]}
          >
            Hey, Dr. Kingsley!
          </Text>
          <Text
            className="text-base text-mainWhite"
            style={[globalStyles.meduim_text]}
          >
            Today is a busy day
          </Text>
        </View>
        <NotifIcon icon={<Iconify icon="mdi:bell" size={24} color="#fff" />} />
      </View>
      <View
        style={{
          rowGap: 6,
        }}
      >
        <FlatList
          data={slides}
          renderItem={({ item }) => <WalletCard {...item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEnabled
          pagingEnabled
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: false }
          )}
          ref={slidesRef}
        />
        <View className="flex justify-center items-center">
          <Paginator
            data={slides}
            scrollX={scrollX}
            range={[19, 52, 19]}
            backgroundColor="#f5f5f5"
            height={3}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;
