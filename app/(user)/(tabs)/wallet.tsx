import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import Transactions from "../../../components/Transactions";
import { useEffect } from "react";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import { getAllOnWallet } from "../../../redux/slices/user/wallet";
import Loader from "../../../components/Common/Loader";
import { globalStyles } from "../../../constants/styles";
import { Link, LinkProps } from "expo-router";
import { ImageBackground } from "expo-image";
import { Iconify } from "react-native-iconify";
import NoRecents from "../../../components/Common/NoRecents";

export default function WalletTab() {
  const { top } = useSafeAreaInsets();

  const { data, loading } = useAppSelector((state) => state.wallet);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getAllOnWallet(signal));

    return () => {
      controller.abort();
    };
  }, []);

  if (loading || !data) {
    return <Loader />;
  }

  const options: {
    icon: React.JSX.Element;
    title: string;
    route: LinkProps<string>["href"];
  }[] = [
    {
      icon: <Iconify icon="ri:refund-fill" color="#8863F2" />,
      title: "Fund Wallet",
      route: "/(user)/wallet/accounts",
    },
    {
      icon: (
        <Iconify icon="icon-park-solid:folder-withdrawal" color="#8863F2" />
      ),
      title: "Withdraw",
      route: "/",
    },
  ];

  return (
    <View
      className="bg-primaryOne flex-1"
      style={{
        paddingTop: top,
      }}
    >
      <View className="flex-1 pt-6">
        <View className="flex-[0.39]  ">
          <ImageBackground
            source={require("../../../assets/images/wallet_bg.png")}
            contentFit="contain"
            contentPosition={{ right: 0 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Header data={data.wallet} options={options} />
          </ImageBackground>
        </View>
        <View className="flex-[0.61] bg-white rounded-t-[20px] ">
          <View className="">
            <View className="flex-row p-4 justify-between items-center">
              <Text
                className="text-base text-mainBlack "
                style={[globalStyles.semibold_text]}
              >
                Recent Transactions
              </Text>
              <Link
                href={`/(user)/wallet/transactions/`}
                className="text-sm text-secondaryTwo  "
                style={[globalStyles.semibold_text]}
                disabled={data.transactions.length === 0}
              >
                See all
              </Link>
            </View>
          </View>
          {data.transactions.length === 0 ? (
            <NoRecents />
          ) : (
            <Transactions transactions={data.transactions} />
          )}
        </View>
      </View>
    </View>
  );
}
