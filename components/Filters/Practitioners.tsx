import { Text, View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "../Common/Button";
import { Categorish, Country } from "../../utils/interface";
import Select from "../Formik/Picker";
import { globalStyles } from "../../constants/styles";
import Input from "../Formik/Input";
import Range from "../Formik/Range";

export type PractitionersFilter = {
  practitioner_category_id: string;
  country_id: string;
  min_price: string;
  max_price: string;
  min_experience: string;
  max_experience: string;
  ratings: string;
};

const PractitionersFilter: React.FC<{
  data: PractitionersFilter;
  handleSubmit: (
    values: PractitionersFilter,
    setSubmitting?: ((isSubmitting: boolean) => void) | undefined
  ) => Promise<void>;
  countries: Country[];
  categories: Categorish[];
}> = ({ data, countries, categories, handleSubmit }) => {
  const {
    practitioner_category_id,
    country_id,
    max_experience,
    max_price,
    min_experience,
    min_price,
    ratings,
  } = data;

  const initialValues = {
    practitioner_category_id,
    country_id,
    max_experience: max_experience,
    max_price: max_price,
    min_experience: min_experience,
    min_price: min_price,
    ratings: ratings,
  };

  const transactionSchema = yup.object().shape({
    practitioner_category_id: yup.string(),
    country_id: yup.string(),
    min_price: yup
      .number()
      .min(parseInt(data.min_price))
      .max(parseInt(data.max_price)),
    max_price: yup
      .number()
      .min(parseInt(data.min_price))
      .max(parseInt(data.max_price)),
    min_experience: yup
      .number()
      .min(parseInt(data.min_experience))
      .max(parseInt(data.max_experience)),
    max_experience: yup
      .number()
      .min(parseInt(data.min_experience))
      .max(parseInt(data.max_experience)),
    ratings: yup.number(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        const body: PractitionersFilter = {
          practitioner_category_id: values.practitioner_category_id,
          country_id: values.country_id,
          max_experience: values.max_experience,
          max_price: values.max_price,
          min_experience: values.min_experience,
          min_price: values.min_price,
          ratings: values.ratings,
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
          className="flex-1 w-full "
          style={{
            rowGap: 32,
          }}
        >
          <View className="space-y-6">
            <View
              style={{
                rowGap: 20,
                paddingHorizontal: 16,
              }}
            >
              <Select
                label="Practitioner Category"
                name="practitioner_category_id"
                value={values.practitioner_category_id}
                errors={errors.practitioner_category_id}
                touched={touched.practitioner_category_id}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Choose Practitioner Category"
                items={categories?.map((catregory) => ({
                  label: `${catregory.name}`,
                  value: catregory.id,
                }))}
              />
              <Select
                label="Country"
                name="country_id"
                value={values.country_id}
                errors={errors.country_id}
                touched={touched.country_id}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Country"
                items={countries?.map((country) => ({
                  label: `${country.emoji} ${country.name}`,
                  value: country.value,
                }))}
              />
            </View>
            <View className="border-y border-mainGray/50 space-y-6 py-6 px-4 ">
              <View className="space-y-6">
                <Text
                  className="text-base text-secondaryBlack pl-2"
                  style={globalStyles.semibold_text}
                >
                  Price (₦)
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    columnGap: 8,
                    alignItems: "flex-start",
                  }}
                >
                  <View className="w-[48%]">
                    <Input
                      label="From"
                      name="min_price"
                      value={values.min_price.toString()}
                      errors={errors.min_price}
                      touched={touched.min_price}
                      handleChange={setFieldValue}
                      handleBlur={handleBlur}
                      placeholder="Min Price"
                      type="none"
                    />
                  </View>
                  <View className="w-[48%]">
                    <Input
                      label="To"
                      name="max_price"
                      value={values.max_price.toString()}
                      errors={errors.max_price}
                      touched={touched.max_price}
                      handleChange={setFieldValue}
                      handleBlur={handleBlur}
                      placeholder="Max Price"
                      type="none"
                    />
                  </View>
                </View>
                <View className="px-4">
                  <Range
                    min={parseInt(min_price)}
                    max={parseInt(max_price)}
                    names={{
                      min: "min_price",
                      max: "max_price",
                    }}
                    values={{
                      max: parseInt(values.max_price),
                      min: parseInt(values.min_price),
                    }}
                    setFieldValue={setFieldValue}
                  />
                </View>
              </View>
              <View className="space-y-6">
                <Text
                  className="text-base text-secondaryBlack pl-2"
                  style={globalStyles.semibold_text}
                >
                  Experience (Years)
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    columnGap: 8,
                    alignItems: "flex-start",
                  }}
                >
                  <View className="w-[48%]">
                    <Input
                      label="From"
                      name="min_experience"
                      value={values.min_experience}
                      errors={errors.min_experience}
                      touched={touched.min_experience}
                      handleChange={setFieldValue}
                      handleBlur={handleBlur}
                      placeholder="Min Experience"
                      type="none"
                    />
                  </View>
                  <View className="w-[48%]">
                    <Input
                      label="To"
                      name="max_experience"
                      value={values.max_experience}
                      errors={errors.max_experience}
                      touched={touched.max_experience}
                      handleChange={setFieldValue}
                      handleBlur={handleBlur}
                      placeholder="Max Experience"
                      type="none"
                    />
                  </View>
                </View>
                <View className="px-4">
                  <Range
                    min={parseInt(min_experience)}
                    max={parseInt(max_experience)}
                    names={{
                      min: "min_experience",
                      max: "max_experience",
                    }}
                    values={{
                      max: parseInt(values.max_experience),
                      min: parseInt(values.min_experience),
                    }}
                    setFieldValue={setFieldValue}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className="px-8">
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

export default PractitionersFilter;
