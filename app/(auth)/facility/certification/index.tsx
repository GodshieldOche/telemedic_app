import { View, Text } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Certification } from "../../../../utils/interface";
import CertificationForm from "../../../../components/PortfolioForm/CertificationForm";
import useAppDispatch from "../../../../hooks/useDispatch";
import { addToFacilityCertifications } from "../../../../redux/slices/facility/facility_portfolio";
import { useRouter } from "expo-router";

const AddCertification = () => {
  const [data, _] = useState<Certification>({
    name: "",
    date: undefined,
    description: "",
    certificate_doc: undefined,
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (values: Certification) => {
    dispatch(
      addToFacilityCertifications({
        data: {
          ...values,
          date: values?.date?.toISOString()?.toString(),
        },
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

export default AddCertification;
