import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { router, useLocalSearchParams } from "expo-router";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import { getPractitioner } from "../../../redux/slices/app/practitioners";
import Loader from "../../../components/Common/Loader";
import { globalStyles } from "../../../constants/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../components/Common/Button";
import ProviderProfile from "../../../components/User/ProviderProfile";

const PractitionerDetails = () => {
  const { bottom } = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, loading, error } = useAppSelector(
    (state) => state.practitioners
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getPractitioner({ id, signal }));

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading || !data) {
    return <Loader />;
  }

  if (error) {
    router.back();
  }

  return (
    <View className="flex-1 relative py-4 bg-white">
      <ScrollView className="flex-1">
        <ProviderProfile data={data} />
      </ScrollView>
      <View
        className="border-t border-borderGray bg-white py-3 px-9 "
        style={{
          paddingBottom: bottom,
          rowGap: 12,
        }}
      >
        <View className="flex-row  justify-between items-center">
          <Text className="text-mainGray" style={[globalStyles.regular_text]}>
            Consultation Price
          </Text>
          <Text
            className="text-[19px] text-secondarySix "
            style={[globalStyles.semibold_text]}
          >
            ₦{data.hourly_rate}/hr
          </Text>
        </View>
        <Button text="Book Appointment" action={() => ""} />
      </View>
    </View>
  );
};

export default PractitionerDetails;
