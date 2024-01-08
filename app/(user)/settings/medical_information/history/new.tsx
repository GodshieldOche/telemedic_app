import { View, Text } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import MedicalHistoryForm from "../../../../../components/MedicalnfoForm/MedicalHistory";
import { MedicalHistory } from "../../../../../utils/interface";
import useAppDispatch from "../../../../../hooks/useDispatch";
import { postAddMedicalHistory } from "../../../../../redux/slices/user/medical_info/medical_history";
import { router } from "expo-router";
import { messageAlert } from "../../../../../components/Common/Alerts";

const NewMedicalHistory = () => {
  const [data, _] = useState<MedicalHistory>({
    condition: "",
    from: undefined,
    to: undefined,
    present: false,
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: MedicalHistory,
    setSubmitting?: (isSubmitting: boolean) => void
  ) => {
    const response = await dispatch(
      postAddMedicalHistory({
        ...values,
        from: values?.from?.toISOString()?.toString(),
        to: values?.to?.toISOString()?.toString(),
      })
    );

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
        <MedicalHistoryForm data={data} handleSubmit={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default NewMedicalHistory;
