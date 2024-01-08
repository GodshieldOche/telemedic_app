import { View } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import useAppDispatch, {
  useAppSelector,
} from "../../../../../hooks/useDispatch";
import { TestResult } from "../../../../../utils/interface";
import { messageAlert } from "../../../../../components/Common/Alerts";
import Loader from "../../../../../components/Common/Loader";
import {
  editTestResult,
  getTestResult,
} from "../../../../../redux/slices/user/medical_info/test_result";
import TestResultForm from "../../../../../components/MedicalnfoForm/TestReult";

const EditTestResult = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isDataLoading, error } = useAppSelector(
    (state) => state.test_result
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getTestResult({ id, signal }));

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleSubmit = async (
    values: TestResult,
    setSubmitting?: (isSubmitting: boolean) => void
  ) => {
    const testResult: TestResult = {
      ...values,
    };

    const body = new FormData();

    Object.keys(testResult).forEach((key) => {
      const value = testResult[key as keyof TestResult];
      if (key === "result_file" && value.uri !== data?.result_file?.uri) {
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
      editTestResult({
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
    return (
      <Redirect href="/(user)/settings/medical_information/test_results" />
    );
  }

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <TestResultForm data={data} handleSubmit={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default EditTestResult;
