import { View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../Formik/Input";
import { Categorish, Country, Education } from "../../utils/interface";
import DateTime from "../Formik/Date";
import Button from "../Common/Button";
import DocPicker from "../Formik/DocumentPicker";
import Select from "../Formik/Picker";

const educationSchema = yup.object().shape({
  institution: yup.string().required("This field is required"),
  degreeId: yup.string().required("This field is required"),
  fieldOfStudy: yup.string().required("This field is required"),
  present: yup.boolean().default(false),
  from: yup.date().required("This field is required"),
  to: yup.date().required("This field is required"),
  certificate_doc: yup.object().required("This field is required"),
});

const EducationForm: React.FC<{
  data: Education;
  handleSubmit: (values: Education) => void;
  countries: Country[];
  degrees: Categorish[];
}> = ({ data, handleSubmit, countries, degrees }) => {
  const {
    institution,
    certificate_doc,
    from,
    to,
    countryId,
    degreeId,
    fieldOfStudy,
    present,
  } = data;

  const initialValues: Education = {
    institution,
    countryId,
    degreeId,
    fieldOfStudy,
    present,
    from: from ? new Date(from) : from,
    to: to ? new Date(to) : to,
    certificate_doc,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      validationSchema={educationSchema}
    >
      {({
        handleBlur,
        handleSubmit,
        errors,
        touched,
        values,
        setFieldValue,
        isSubmitting,
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
                label="Institution Name"
                name="institution"
                value={values.institution}
                errors={errors.institution}
                touched={touched.institution}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Enter Institution Name"
                type="name"
                autoCapitalize="sentences"
              />
              <Select
                label="Degree"
                name="degreeId"
                value={values.degreeId}
                errors={errors.degreeId}
                touched={touched.degreeId}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Select Degree"
                items={degrees?.map((degree) => ({
                  label: degree.name,
                  value: degree.id,
                }))}
              />
              <Input
                label="Field of Study"
                name="fieldOfStudy"
                value={values.fieldOfStudy}
                errors={errors.fieldOfStudy}
                touched={touched.fieldOfStudy}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Enter Field of study"
                type="none"
                autoCapitalize="sentences"
              />
              <DateTime
                label="From"
                name="from"
                value={values.from}
                errors={errors.from}
                touched={touched.from}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="00/00/0000"
              />
              <DateTime
                label="To"
                name="to"
                value={values.to}
                errors={errors.to}
                touched={touched.to}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="00/00/0000"
              />

              <Select
                label="Country"
                name="countryId"
                value={values.countryId}
                errors={errors.countryId}
                touched={touched.countryId}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Select Country"
                items={countries?.map((country) => ({
                  label: `${country.emoji} ${country.name}`,
                  value: country.value,
                }))}
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
          <Button text="Save" loading={isSubmitting} action={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default EducationForm;
