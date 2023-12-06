import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../../components/User/Wallet/Header";
import Transactions from "../../../components/User/Wallet/Transactions";
import { useEffect } from "react";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import { getAllOnWallet } from "../../../redux/slices/user/wallet";
import Loader from "../../../components/Common/Loader";

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

  return (
    <View
      className="bg-primaryOne flex-1"
      style={{
        paddingTop: top,
      }}
    >
      <View className="flex-1 pt-6">
        <View className="flex-[0.39]  ">
          <Header data={data.wallet} />
        </View>
        <View className="flex-[0.61] bg-white rounded-t-[20px] ">
          <Transactions transactions={data.transactions} />
        </View>
      </View>
    </View>
  );
}
