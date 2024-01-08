import { View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "../Common/Button";
import DateTime from "../Formik/Date";

export type TransactionFilter = {
  start_date: Date | undefined | any;
  end_date: Date | undefined | any;
};

const transactionSchema = yup.object().shape({
  start_date: yup.date().required("This field is required"),
  end_date: yup.date().required("This field is required"),
});

const Transaction: React.FC<{
  data: TransactionFilter;
  handleSubmit: (
    values: TransactionFilter,
    setSubmitting?: ((isSubmitting: boolean) => void) | undefined
  ) => Promise<void>;
}> = ({ data, handleSubmit }) => {
  const { start_date, end_date } = data;

  const initialValues = {
    start_date: start_date ? new Date(start_date) : start_date,
    end_date: end_date ? new Date(end_date) : end_date,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        const body: TransactionFilter = {
          start_date: values.start_date?.toISOString().toString(),
          end_date: values.end_date?.toISOString().toString(),
        };
        handleSubmit(body, setSubmitting);
      }}
      validationSchema={transactionSchema}
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
          className="flex-1 w-full px-4 "
          style={{
            rowGap: 32,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              rowGap: 16,
            }}
          >
            <DateTime
              label="Start Date"
              name="start_date"
              value={values.start_date}
              errors={errors.start_date}
              touched={touched.start_date}
              handleChange={setFieldValue}
              handleBlur={handleBlur}
              placeholder="00/00/0000"
            />
            <DateTime
              label="End Date"
              name="end_date"
              value={values.end_date}
              errors={errors.end_date}
              touched={touched.end_date}
              handleChange={setFieldValue}
              handleBlur={handleBlur}
              placeholder="00/00/0000"
            />
          </View>
          <View className="px-4">
            <Button
              text="Save"
              loading={isSubmitting}
              disabled={!isValid}
              action={handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Transaction;
