import { View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../Formik/Input";
import { Certification } from "../../utils/interface";
import DateTime from "../Formik/Date";
import Button from "../Common/Button";
import DocPicker from "../Formik/DocumentPicker";

const certificateSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  date: yup.date().required("This field is required"),
  certificate_doc: yup.object().required("This field is required"),
});

const CertificationForm: React.FC<{
  data: Certification;
  handleSubmit: (values: Certification) => void;
}> = ({ data, handleSubmit }) => {
  const { name, certificate_doc, date, description } = data;

  const initialValues: Certification = {
    name,
    date: date ? new Date(date) : date,
    certificate_doc,
    description,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      validationSchema={certificateSchema}
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
                label="Certification Name"
                name="name"
                value={values.name}
                errors={errors.name}
                touched={touched.name}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Enter Certification Name"
                type="name"
                autoCapitalize="sentences"
              />
              <Input
                label="Description"
                name="description"
                value={values.description}
                errors={errors.description}
                touched={touched.description}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Enter Description"
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
                label="Certificate"
                name="certificate_doc"
                type="application/pdf"
                values={[values.certificate_doc]}
                errors={errors.certificate_doc}
                touched={touched.certificate_doc}
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

export default CertificationForm;
