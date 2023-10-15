import { View, Text } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Licence } from "../../../../utils/interface";
import useAppDispatch from "../../../../hooks/useDispatch";
import { addToFacilityLicences } from "../../../../redux/slices/facility/facility_portfolio";
import { useRouter } from "expo-router";
import LicenceForm from "../../../../components/PortfolioForm/LicenceForm";

const AddCertification = () => {
  const [data, _] = useState<Licence>({
    name: "",
    from: undefined,
    to: undefined,
    description: "",
    licence_doc: undefined,
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (values: Licence) => {
    dispatch(
      addToFacilityLicences({
        data: {
          ...values,
          from: values?.from?.toISOString()?.toString(),
          to: values?.to?.toISOString()?.toString(),
        },
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

export default AddCertification;
