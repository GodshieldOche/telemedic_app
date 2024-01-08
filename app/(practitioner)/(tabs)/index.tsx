import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { ImageBackground } from "expo-image";
import Appointments from "../../../components/Practitioner/Home/Appointments";
import Transactions from "../../../components/Practitioner/Home/Transactions";
import Header from "../../../components/Header";
import { useAppSelector } from "../../../hooks/useDispatch";

export default function TabOneScreen() {
  const data = useAppSelector((state) => state.practitionerProfile).data!;
  const { top } = useSafeAreaInsets();

  return (
    <View
      className="bg-primaryOne flex-1"
      style={{
        paddingTop: top,
      }}
    >
      <View className="flex-1 pt-6">
        <View className="flex-[0.27]  ">
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
              options={[]}
              title={`Hey, Dr. ${data.first_name}!`}
              text="Today is a busy day"
            />
          </ImageBackground>
        </View>
        <View className="flex-[0.73] bg-white rounded-t-[20px] ">
          <View className="flex-[0.5]">
            <Appointments />
          </View>
          <View className="flex-[0.5] border-t border-primaryGray">
            <Transactions />
          </View>
        </View>
      </View>
    </View>
  );
}
