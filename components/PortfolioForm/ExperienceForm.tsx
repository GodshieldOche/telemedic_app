import { Text, View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../Formik/Input";
import { Country, Experience } from "../../utils/interface";
import Button from "../Common/Button";
import Select from "../Formik/Picker";
import { globalStyles } from "../../constants/styles";
import CheckBox from "../Formik/Checkbox";
import { months } from "../../utils/data";
import { getYears } from "../../utils/helper";
import TextArea from "../Formik/TextArea";

const educationSchema = yup.object().shape({
  title: yup.string().required("This field is required"),
  organisation: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  country_id: yup.string().required("This field is required"),
  present: yup.boolean().default(false),
  from_year: yup.number().required("This field is required"),
  from_month: yup.number().required("This field is required"),
  to_year: yup
    .number()
    .when("present", {
      is: false,
      then: (schema) => schema.required("This field is required"),
      otherwise: (schema) => schema.optional(),
    })
    .test(
      "is-greater",
      "To year must be greater than the from year",
      function (value) {
        const { from_year } = this.parent;
        if (!value) {
          return true;
        }
        return value > from_year;
      }
    ),
  to_month: yup.number().when("present", {
    is: false,
    then: (schema) => schema.required("This field is required"),
    otherwise: (schema) => schema.optional(),
  }),
});

const ExperienceForm: React.FC<{
  data: Experience;
  handleSubmit: (values: Experience) => void;
  countries: Country[];
}> = ({ data, handleSubmit, countries }) => {
  const { title, organisation, description, country_id, from, to, present } =
    data;

  const initialValues = {
    title,
    organisation,
    description,
    country_id,
    present,
    from_month: from ? new Date(from).getMonth() + 1 : undefined,
    from_year: from ? new Date(from).getFullYear() : undefined,
    to_month: to ? new Date(to).getMonth() + 1 : undefined,
    to_year: to ? new Date(to).getFullYear() : undefined,
  };

  const years = getYears().reverse();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const body: Experience = {
          title: values.title,
          country_id: values.country_id,
          description: values.description,
          organisation: values.organisation,
          present: values.present,
          from: new Date(`${values.from_year}-${values.from_month}-1`),
          to: !values.present
            ? new Date(`${values.to_year}-${values.to_month}-1`)
            : undefined,
        };
        handleSubmit(body);
      }}
      validationSchema={educationSchema}
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
              <TextArea
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

              {/* From _to */}
              <Text
                className="text-base text-secondaryBlack pl-2"
                style={globalStyles.semibold_text}
              >
                From
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  columnGap: 8,
                  alignItems: "flex-start",
                }}
              >
                <View className="w-[50%]">
                  <Select
                    label="Month"
                    name="from_month"
                    value={values.from_month}
                    errors={errors.from_month}
                    touched={touched.from_month}
                    handleChange={setFieldValue}
                    handleBlur={handleBlur}
                    placeholder="Select Month"
                    items={months.map((month) => ({
                      label: month.name,
                      value: month.number,
                    }))}
                  />
                </View>
                <View className="w-[50%]">
                  <Select
                    label="Year"
                    name="from_year"
                    value={values.from_year}
                    errors={errors.from_year}
                    touched={touched.from_year}
                    handleChange={setFieldValue}
                    handleBlur={handleBlur}
                    placeholder="Select Year"
                    items={years.map((year) => ({
                      label: year.toString(),
                      value: year,
                    }))}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  columnGap: 8,
                  alignItems: "center",
                }}
              >
                <Text
                  className="text-base w-[50%] text-secondaryBlack pl-2"
                  style={globalStyles.semibold_text}
                >
                  To
                </Text>
                <CheckBox
                  label={
                    <Text
                      className="text-sm text-secondaryBlack"
                      style={globalStyles.semibold_text}
                    >
                      Currently Enrolled
                    </Text>
                  }
                  name="present"
                  value={values.present}
                  errors={errors.present}
                  touched={touched.present}
                  handleChange={setFieldValue}
                  handleBlur={handleBlur}
                />
              </View>
              {!values.present && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    columnGap: 8,
                    alignItems: "flex-start",
                  }}
                >
                  <View className="w-[50%]">
                    <Select
                      label="Month"
                      name="to_month"
                      value={values.to_month}
                      errors={errors.to_month}
                      touched={touched.to_month}
                      handleChange={setFieldValue}
                      handleBlur={handleBlur}
                      placeholder="Select Month"
                      items={months.map((month) => ({
                        label: month.name,
                        value: month.number,
                      }))}
                    />
                  </View>
                  <View className="w-[50%]">
                    <Select
                      label="Year"
                      name="to_year"
                      value={values.to_year}
                      errors={errors.to_year}
                      touched={touched.to_year}
                      handleChange={setFieldValue}
                      handleBlur={handleBlur}
                      placeholder="Select Year"
                      items={years.map((year) => ({
                        label: year.toString(),
                        value: year,
                      }))}
                    />
                  </View>
                </View>
              )}

              {/* From _to */}

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

export default ExperienceForm;
