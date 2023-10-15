import { View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../Formik/Input";
import { Licence } from "../../utils/interface";
import DateTime from "../Formik/Date";
import Button from "../Common/Button";
import DocPicker from "../Formik/DocumentPicker";

const certificateSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  from: yup.date().required("This field is required"),
  to: yup.date().required("This field is required"),
  licence_doc: yup.object().required("This field is required"),
});

const LicenceForm: React.FC<{
  data: Licence;
  handleSubmit: (values: Licence) => void;
}> = ({ data, handleSubmit }) => {
  const { name, licence_doc, from, to, description } = data;

  const initialValues: Licence = {
    name,
    from: from ? new Date(from) : from,
    to: to ? new Date(to) : to,
    licence_doc,
    description,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      validationSchema={certificateSchema}
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
                label="Licence Name"
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

              <DocPicker
                label="Licence"
                name="licence_doc"
                type="application/pdf"
                values={[values.licence_doc]}
                errors={errors.licence_doc}
                touched={touched.licence_doc}
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

export default LicenceForm;
