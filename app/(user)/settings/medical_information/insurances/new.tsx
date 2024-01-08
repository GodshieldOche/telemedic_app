import { View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Insurance } from "../../../../../utils/interface";
import useAppDispatch from "../../../../../hooks/useDispatch";
import { router } from "expo-router";
import { messageAlert } from "../../../../../components/Common/Alerts";
import HealthInsuranceForm from "../../../../../components/MedicalnfoForm/HealthInsurance";
import { postAddInsurance } from "../../../../../redux/slices/user/medical_info/insurance";

const NewHealthInsurance = () => {
  const [data, _] = useState<Insurance>({
    name: "",
    from: undefined,
    to: undefined,
    number: "",
    insurance_doc: undefined,
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: Insurance,
    setSubmitting?: (isSubmitting: boolean) => void
  ) => {
    const insurance: Insurance = {
      ...values,
      from: values?.from?.toISOString()?.toString(),
      to: values?.to?.toISOString()?.toString(),
    };

    const body = new FormData();

    Object.keys(insurance).forEach((key) => {
      if (key !== "insurance_doc") {
        body.append(key, insurance[key as keyof Insurance]);
      } else {
        const doc = insurance[key as keyof Insurance];
        const file = {
          uri: doc.uri,
          type: doc.mimetype,
          name: doc.name,
        };
        body.append(key, file as any);
      }
    });

    const response = await dispatch(postAddInsurance(body));

    if (response.error) {
      messageAlert(
        "Error",
        (response?.payload && response?.payload[0]?.error) ||
          "Something went wrong"
      );
      setSubmitting?.(false);
      return;
    }

    router.back();
  };

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <HealthInsuranceForm data={data} handleSubmit={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default NewHealthInsurance;
