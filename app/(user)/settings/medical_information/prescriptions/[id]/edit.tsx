import { View, Text } from "react-native";
import React, { useEffect } from "react";
import useAppDispatch, {
  useAppSelector,
} from "../../../../../../hooks/useDispatch";
import { ScrollView } from "react-native-gesture-handler";
import PrescriptionForm from "../../../../../../components/MedicalnfoForm/Prescription";
import { router, useLocalSearchParams } from "expo-router";
import {
  editPrescription,
  getPrescription,
  postAddOrUpdatePrescriptionMedia,
} from "../../../../../../redux/slices/user/medical_info/prescription";
import { getMedications } from "../../../../../../redux/slices/app/app";
import Loader from "../../../../../../components/Common/Loader";
import { messageAlert } from "../../../../../../components/Common/Alerts";
import { Prescription } from "../../../../../../utils/interface";

const Edit = () => {
  const { isDataLoading, data } = useAppSelector((state) => state.prescription);
  const { medications, loading } = useAppSelector((state) => state.app);

  const { id: joinId } = useLocalSearchParams<{ id: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const id = joinId.split("+").pop() as string;

    if (!id) {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getPrescription({ id: id, signal }));
    dispatch(getMedications(signal));

    return () => {
      controller.abort();
    };
  }, [joinId]);

  if (loading || isDataLoading) {
    return <Loader />;
  }

  const handleSubmit = async (
    values: Prescription,
    setSubmitting?: (isSubmitting: boolean) => void
  ) => {
    const medication_image = values.medication_image;

    delete values.medication_image;

    const response = await dispatch(
      editPrescription({ body: values, id: data?.id })
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

    if (
      medication_image &&
      medication_image.uri !== data?.medication_image?.uri
    ) {
      const body = new FormData();
      body.append("medication_image", {
        uri: medication_image.uri,
        type: medication_image.type,
        name: medication_image.fileName,
      } as any);

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
    }

    router.push("/(user)/settings/medical_information/prescriptions");
  };

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <PrescriptionForm
          data={data!}
          medications={medications}
          handleSubmit={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

export default Edit;
