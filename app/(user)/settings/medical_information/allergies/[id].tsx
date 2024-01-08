import { View } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import useAppDispatch, {
  useAppSelector,
} from "../../../../../hooks/useDispatch";
import { Allergy } from "../../../../../utils/interface";
import { messageAlert } from "../../../../../components/Common/Alerts";
import Loader from "../../../../../components/Common/Loader";
import {
  editAllergy,
  getAllergy,
} from "../../../../../redux/slices/user/medical_info/allergy";
import AllergyForm from "../../../../../components/MedicalnfoForm/Allergy";

const EditAllergy = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isDataLoading, error } = useAppSelector(
    (state) => state.allergy
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getAllergy({ id, signal }));

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleSubmit = async (
    values: Allergy,
    setSubmitting?: (isSubmitting: boolean) => void
  ) => {
    const response = await dispatch(
      editAllergy({
        body: values,
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
    return <Redirect href="/(user)/settings/medical_information/allergies" />;
  }

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <AllergyForm data={data} handleSubmit={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default EditAllergy;
