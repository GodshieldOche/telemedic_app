import { View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useLocalSearchParams, useRouter } from "expo-router";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import { Certification } from "../../../../utils/interface";
import CertificationForm from "../../../../components/PortfolioForm/CertificationForm";
import { editPractitionerCertification } from "../../../../redux/slices/practitioner/practitioner_portfolio";

const EditCertification = () => {
  const { index } = useLocalSearchParams<{ index: string }>();
  const { certifications } = useAppSelector(
    (state) => state.practitionerPortfolio
  );
  const [data, _] = useState<Certification>(certifications[Number(index)]);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (values: Certification) => {
    dispatch(
      editPractitionerCertification({
        data: {
          ...values,
          date: values?.date?.toISOString()?.toString(),
        },
        index: Number(index),
      })
    );
    router.back();
  };

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <CertificationForm data={data} handleSubmit={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default EditCertification;
