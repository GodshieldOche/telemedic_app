import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import useAppDispatch, {
  useAppSelector,
} from "../../../../../hooks/useDispatch";
import { MedicalHistory } from "../../../../../utils/interface";
import MedicalHistoryForm from "../../../../../components/MedicalnfoForm/MedicalHistory";
import { messageAlert } from "../../../../../components/Common/Alerts";
import {
  editMedicalHistory,
  getMedicalHistoryDetails,
} from "../../../../../redux/slices/user/medical_info/medical_history";
import Loader from "../../../../../components/Common/Loader";

const EditMedicalHistory = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isDataLoading, error } = useAppSelector(
    (state) => state.medical_history
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getMedicalHistoryDetails({ id, signal }));

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleSubmit = async (
    values: MedicalHistory,
    setSubmitting?: (isSubmitting: boolean) => void
  ) => {
    const body = {
      ...values,
      from: values?.from?.toISOString()?.toString(),
      to: values?.to?.toISOString()?.toString(),
    };

    Object.keys(body).forEach((key) => {
      if (!body[key as keyof typeof body] && key !== "present") {
        delete body[key as keyof typeof body];
      }
    });

    const response = await dispatch(
      editMedicalHistory({
        body,
        id,
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

  if (isDataLoading || !data) {
    return <Loader />;
  }

  if (error) {
    return <Redirect href="/(user)/settings/medical_information/history" />;
  }

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <MedicalHistoryForm data={data} handleSubmit={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default EditMedicalHistory;
