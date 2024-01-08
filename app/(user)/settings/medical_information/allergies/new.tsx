import { View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import useAppDispatch from "../../../../../hooks/useDispatch";
import { router } from "expo-router";
import { messageAlert } from "../../../../../components/Common/Alerts";
import AllergyForm from "../../../../../components/MedicalnfoForm/Allergy";
import { Allergy } from "../../../../../utils/interface";
import { postAddAllergy } from "../../../../../redux/slices/user/medical_info/allergy";

const NewMedicalHistory = () => {
  const [data, _] = useState<Allergy>({
    agent: "",
    reactions: [""],
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: Allergy,
    setSubmitting?: (isSubmitting: boolean) => void
  ) => {
    const response = await dispatch(postAddAllergy(values));

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
        <AllergyForm data={data} handleSubmit={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default NewMedicalHistory;
