import { View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../Formik/Input";
import { TestResult } from "../../utils/interface";
import Button from "../Common/Button";
import DocPicker from "../Formik/DocumentPicker";
import DateTime from "../Formik/Date";

const insuranceSchema = yup.object().shape({
  healthCenter: yup.string().required("This field is required"),
  test: yup.string().required("This field is required"),
  date: yup.date().required("This field is required"),
  result_file: yup.object().required("This field is required"),
});

const TestResultForm: React.FC<{
  data: TestResult;
  handleSubmit: (
    values: TestResult,
    setSubmitting?: ((isSubmitting: boolean) => void) | undefined
  ) => Promise<void>;
}> = ({ data, handleSubmit }) => {
  const { healthCenter, date, result_file, test } = data;

  const initialValues = {
    healthCenter,
    date: date ? new Date(date) : date,
    test,
    result_file,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        const body: TestResult = {
          healthCenter: values.healthCenter,
          test: values.test,
          date: values.date?.toISOString().toString(),
          result_file: values.result_file,
        };
        handleSubmit(body, setSubmitting);
      }}
      validationSchema={insuranceSchema}
      validateOnMount
    >
      {({
        handleBlur,
        handleSubmit,
        errors,
        touched,
        values,
        setFieldValue,
        isSubmitting,
        isValid,
      }) => (
        <View
          className="flex-1 w-full "
          style={{
            rowGap: 32,
          }}
        >
          <View
            className="flex-1 h-full w-full bg-primaryGray px-4 py-5 rounded-lg"
            style={{
              flex: 1,
              flexDirection: "column",
              rowGap: 32,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                rowGap: 16,
              }}
            >
              <Input
                label="Healthcare  Centre"
                name="healthCenter"
                value={values.healthCenter}
                errors={errors.healthCenter}
                touched={touched.healthCenter}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Healthcare Centre Name"
                type="name"
                autoCapitalize="sentences"
              />
              <Input
                label="Test"
                name="test"
                value={values.test}
                errors={errors.test}
                touched={touched.test}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="eg. Malaria Test"
                type="none"
                autoCapitalize="sentences"
              />

              <DateTime
                label="Date"
                name="date"
                value={values.date}
                errors={errors.date}
                touched={touched.date}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="00/00/0000"
              />

              <DocPicker
                label="Result File"
                name="result_file"
                type="application/pdf"
                values={[values.result_file]}
                errors={errors.result_file}
                touched={touched.result_file}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
              />
            </View>
          </View>
          <Button
            text="Save"
            loading={isSubmitting}
            disabled={!isValid}
            action={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
};

export default TestResultForm;
