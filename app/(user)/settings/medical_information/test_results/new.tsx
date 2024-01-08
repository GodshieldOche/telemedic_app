import { View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TestResult } from "../../../../../utils/interface";
import useAppDispatch from "../../../../../hooks/useDispatch";
import { router } from "expo-router";
import { messageAlert } from "../../../../../components/Common/Alerts";
import { postAddTestResult } from "../../../../../redux/slices/user/medical_info/test_result";
import TestResultForm from "../../../../../components/MedicalnfoForm/TestReult";

const NewTestResult = () => {
  const [data, _] = useState<TestResult>({
    healthCenter: "",
    test: "",
    date: undefined,
    result_file: undefined,
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: TestResult,
    setSubmitting?: (isSubmitting: boolean) => void
  ) => {
    const testResult: TestResult = {
      ...values,
    };

    const body = new FormData();

    Object.keys(testResult).forEach((key) => {
      if (key !== "result_file") {
        body.append(key, testResult[key as keyof TestResult]);
      } else {
        const doc = testResult[key as keyof TestResult];
        const file = {
          uri: doc.uri,
          type: doc.mimetype,
          name: doc.name,
        };
        body.append(key, file as any);
      }
    });

    const response = await dispatch(postAddTestResult(body));

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
        <TestResultForm data={data} handleSubmit={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default NewTestResult;
