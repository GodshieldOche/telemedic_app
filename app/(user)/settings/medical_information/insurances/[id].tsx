import { View } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import useAppDispatch, {
  useAppSelector,
} from "../../../../../hooks/useDispatch";
import { Insurance } from "../../../../../utils/interface";
import { messageAlert } from "../../../../../components/Common/Alerts";
import Loader from "../../../../../components/Common/Loader";
import HealthInsuranceForm from "../../../../../components/MedicalnfoForm/HealthInsurance";
import {
  editInsurance,
  getInsurance,
} from "../../../../../redux/slices/user/medical_info/insurance";

const EditInsurance = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isDataLoading, error } = useAppSelector(
    (state) => state.insurance
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getInsurance({ id, signal }));

    return () => {
      controller.abort();
    };
  }, [id]);

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
      const value = insurance[key as keyof Insurance];
      if (key === "insurance_doc" && value.uri !== data?.insurance_doc?.uri) {
        const file = {
          uri: value.uri,
          type: value.mimetype,
          name: value.name,
        };
        body.append(key, file as any);
      } else {
        body.append(key, value);
      }
    });

    const response = await dispatch(
      editInsurance({
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
    return <Redirect href="/(user)/settings/medical_information/insurances" />;
  }

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <HealthInsuranceForm data={data} handleSubmit={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default EditInsurance;
