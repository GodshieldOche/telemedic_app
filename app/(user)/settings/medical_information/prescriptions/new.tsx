import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Prescription } from "../../../../../utils/interface";
import useAppDispatch, {
  useAppSelector,
} from "../../../../../hooks/useDispatch";
import { router } from "expo-router";
import { messageAlert } from "../../../../../components/Common/Alerts";
import {
  postAddOrUpdatePrescriptionMedia,
  postAddPrescription,
} from "../../../../../redux/slices/user/medical_info/prescription";
import PrescriptionForm from "../../../../../components/MedicalnfoForm/Prescription";
import { getMedications } from "../../../../../redux/slices/app/app";
import Loader from "../../../../../components/Common/Loader";

const NewPrescription = () => {
  const [data, _] = useState<Prescription>({
    name: "",
    start_date: undefined,
    end_date: undefined,
    description: "",
    medication_id: "",
    time_segments: [
      {
        part_of_day: "Morning",
        quantity: 1,
        time: undefined,
      },
    ],
    created_by: "user",
  });

  const { medications, loading } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getMedications(signal));

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleSubmit = async (
    values: Prescription,
    setSubmitting?: (isSubmitting: boolean) => void
  ) => {
    const medication_image = values.medication_image;

    delete values.medication_image;

    const body = new FormData();
    body.append("medication_image", {
      uri: medication_image.uri,
      type: medication_image.type,
      name: medication_image.fileName,
    } as any);

    const response = await dispatch(postAddPrescription(values));

    if (response.error) {
      messageAlert(
        "Error",
        (response?.payload && response?.payload[0]?.error) ||
          "Something went wrong"
      );
      setSubmitting?.(false);
      return;
    }

    const res = await dispatch(
      postAddOrUpdatePrescriptionMedia({ body, id: response.payload.id })
    );

    if (res.error) {
      messageAlert(
        "Error",
        (res?.payload && res?.payload[0]?.error) || "Something went wrong"
      );
      setSubmitting?.(false);
      return;
    }
    router.back();
  };

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <PrescriptionForm
          data={data}
          medications={medications}
          handleSubmit={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

export default NewPrescription;
