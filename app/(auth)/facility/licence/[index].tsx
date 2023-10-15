import { View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useLocalSearchParams, useRouter } from "expo-router";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import { Licence } from "../../../../utils/interface";
import { editFacilityLicences } from "../../../../redux/slices/facility/facility_portfolio";
import LicenceForm from "../../../../components/PortfolioForm/LicenceForm";

const EditCertification = () => {
  const { index } = useLocalSearchParams<{ index: string }>();
  const { licences } = useAppSelector((state) => state.facilityPortfolio);
  const [data, _] = useState<Licence>(licences[Number(index)]);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (values: Licence) => {
    dispatch(
      editFacilityLicences({
        data: {
          ...values,
          from: values?.from?.toISOString()?.toString(),
          to: values?.to?.toISOString()?.toString(),
        },
        index: Number(index),
      })
    );
    router.back();
  };

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <LicenceForm data={data} handleSubmit={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default EditCertification;
