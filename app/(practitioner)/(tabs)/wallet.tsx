import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAppDispatch from "../../../hooks/useDispatch";
import { ImageBackground } from "expo-image";
import { globalStyles } from "../../../constants/styles";
import { Link, LinkProps } from "expo-router";
import NoRecents from "../../../components/Common/NoRecents";
import Transactions from "../../../components/Transactions";
import Header from "../../../components/Header";
import { Iconify } from "react-native-iconify";

export default function WalletTab() {
  const { top } = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const options: {
    icon: React.JSX.Element;
    title: string;
    route: LinkProps<string>["href"];
  }[] = [
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
        <View className="flex-[0.38]  ">
          <ImageBackground
            source={require("../../../assets/images/wallet_bg.png")}
            contentFit="contain"
            contentPosition={{ right: 0 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Header
              data={{
                currency: "Dollars",
                locked_balance: 0.0,
                main_balance: 0.0,
                id: "",
                symbol: "$",
              }}
              options={options}
            />
          </ImageBackground>
        </View>
        <View className="flex-[0.62] bg-white rounded-t-[20px] ">
          <View className="">
            <View className="flex-row p-4 justify-between items-center">
              <Text
                className="text-base text-mainBlack "
                style={[globalStyles.semibold_text]}
              >
                Recent Transactions
              </Text>
              <Link
                href={`/(practitioner)/wallet/transactions/`}
                className="text-sm text-secondaryTwo  "
                style={[globalStyles.semibold_text]}
                // disabled={data.transactions.length === 0}
              >
                See all
              </Link>
            </View>
          </View>
          {[].length === 0 ? <NoRecents /> : <Transactions transactions={[]} />}
        </View>
      </View>
    </View>
  );
}
