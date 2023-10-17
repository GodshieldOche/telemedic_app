import { Text, View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../Formik/Input";
import { Licence } from "../../utils/interface";
import Button from "../Common/Button";
import DocPicker from "../Formik/DocumentPicker";
import Select from "../Formik/Picker";
import { getYears } from "../../utils/helper";
import { months } from "../../utils/data";
import { globalStyles } from "../../constants/styles";

const certificateSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  from_year: yup.number().required("This field is required"),
  from_month: yup.number().required("This field is required"),
  to_year: yup
    .number()
    .required("This field is required")
    .test(
      "is-greater",
      "To year must be greater than the from year",
      function (value) {
        const { from_year } = this.parent;
        return value > from_year;
      }
    ),
  to_month: yup.number().required("This field is required"),
  licence_doc: yup.object().required("This field is required"),
});

const LicenceForm: React.FC<{
  data: Licence;
  handleSubmit: (values: Licence) => void;
}> = ({ data, handleSubmit }) => {
  const { name, licence_doc, from, to, description } = data;

  const initialValues = {
    name,
    from_month: from ? new Date(from).getMonth() + 1 : undefined,
    from_year: from ? new Date(from).getFullYear() : undefined,
    to_month: to ? new Date(to).getMonth() + 1 : undefined,
    to_year: to ? new Date(to).getFullYear() : undefined,
    licence_doc,
    description,
  };

  const to_years = getYears(new Date().getFullYear() + 20).reverse();
  const years = getYears().reverse();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const body: Licence = {
          name: values.name,
          description: values.description,
          from: new Date(`${values.from_year}-${values.from_month}-1`),
          to: new Date(`${values.to_year}-${values.to_month}-1`),
          licence_doc: values.licence_doc,
        };
        handleSubmit(body);
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

              <Text
                className="text-base text-secondaryBlack pl-2"
                style={globalStyles.semibold_text}
              >
                To
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
                    items={to_years.map((year) => ({
                      label: year.toString(),
                      value: year,
                    }))}
                  />
                </View>
              </View>
              {/* From _to */}

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

export default LicenceForm;
