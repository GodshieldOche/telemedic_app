import { View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../Formik/Input";
import { Country, Experience } from "../../utils/interface";
import DateTime from "../Formik/Date";
import Button from "../Common/Button";
import Select from "../Formik/Picker";

const educationSchema = yup.object().shape({
  title: yup.string().required("This field is required"),
  organisation: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  country_id: yup.string().required("This field is required"),
  present: yup.boolean().default(false),
  from: yup.date().required("This field is required"),
  to: yup.date().required("This field is required"),
});

const ExperienceForm: React.FC<{
  data: Experience;
  handleSubmit: (values: Experience) => void;
  countries: Country[];
}> = ({ data, handleSubmit, countries }) => {
  const { title, organisation, description, country_id, from, to, present } =
    data;

  const initialValues: Experience = {
    title,
    organisation,
    description,
    country_id,
    present,
    from: from ? new Date(from) : from,
    to: to ? new Date(to) : to,
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
                label="Job Title"
                name="title"
                value={values.title}
                errors={errors.title}
                touched={touched.title}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Enter Job title"
                type="name"
                autoCapitalize="sentences"
              />

              <Input
                label="Organisation"
                name="organisation"
                value={values.organisation}
                errors={errors.organisation}
                touched={touched.organisation}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Enter Organisation"
                type="none"
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

              <Select
                label="Country"
                name="country_id"
                value={values.country_id}
                errors={errors.country_id}
                touched={touched.country_id}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Select Country"
                items={countries?.map((country) => ({
                  label: `${country.emoji} ${country.name}`,
                  value: country.value,
                }))}
              />
            </View>
          </View>
          <Button text="Save" loading={isSubmitting} action={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default ExperienceForm;
