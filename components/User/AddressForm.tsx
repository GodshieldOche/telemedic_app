import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../Formik/Input";
import Select from "../Formik/Picker";
import { Address, Country } from "../../utils/interface";
import useAppDispatch, { useAppSelector } from "../../hooks/useDispatch";
import { getStates } from "../../redux/slices/app/state";
import { getCities, resetCities } from "../../redux/slices/app/cities";
import CheckBox from "../Formik/Checkbox";
import { globalStyles } from "../../constants/styles";
import Button from "../Common/Button";

const addressSchema = yup.object().shape({
  first_name: yup.string().required("This field is required"),
  last_name: yup.string().required("This field is required"),
  phone_code: yup.string().required("Required"),
  phone_no: yup
    .string()
    .min(10, "Must be at least 10 digits long")
    .required("This field is required"),
  postal_code: yup.string().required("This field is required"),
  street_line_one: yup.string().required("This field is required"),
  country_id: yup.string().required("This field is required"),
  state_id: yup.string().required("This field is required"),
  city_id: yup.string().required("This field is required"),
  is_default: yup.boolean().default(false),
});

const AddressForm: React.FC<{
  countries: Country[];
  data: Address;
  handleSubmit: (
    values: Address,
    setSubmitting?: ((isSubmitting: boolean) => void) | undefined
  ) => Promise<void>;
}> = ({ data, countries, handleSubmit }) => {
  const {
    country_id,
    state_id,
    city_id,
    is_default,
    postal_code,
    street_line_one,
    first_name,
    last_name,
    phone_code,
    phone_no,
  } = data;

  const initialValues: Address = {
    postal_code,
    street_line_one,
    country_id,
    state_id,
    city_id,
    is_default,
    first_name,
    last_name,
    phone_code,
    phone_no,
  };

  const [count, setCount] = useState(null);
  const [stat, setStat] = useState(null);

  const { data: states } = useAppSelector((state) => state.state);
  const { data: cities } = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCount(country_id as any);
    setStat(state_id as any);
  }, [country_id]);

  useEffect(() => {
    if (!count) {
      return;
    }
    dispatch(getStates(count));
    dispatch(resetCities());
  }, [count]);

  useEffect(() => {
    if (!stat) {
      return;
    }
    dispatch(getCities(stat));
  }, [stat]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        const body: Address = {
          ...values,
          country_id: parseInt(values.country_id as string),
          state_id: parseInt(values.state_id as string),
          city_id: parseInt(values.city_id as string),
        };
        await handleSubmit(body);
      }}
      validationSchema={addressSchema}
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
        <>
          <View
            className="flex-1 !mn-28 w-full "
            style={{
              rowGap: 32,
            }}
          >
            <View
              className="flex-1 h-full w-full bg-primaryGray px-4 py-5 rounded-lg"
              style={{
                flex: 1,
                flexDirection: "column",
                rowGap: 28,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  rowGap: 16,
                }}
              >
                <Input
                  label="First Name"
                  name="first_name"
                  value={values.first_name as string}
                  errors={errors.first_name}
                  touched={touched.first_name}
                  handleChange={setFieldValue}
                  handleBlur={handleBlur}
                  placeholder="First name"
                  type="familyName"
                  autoCapitalize="sentences"
                />
                <Input
                  label="Last Name"
                  name="last_name"
                  value={values.last_name as string}
                  errors={errors.last_name}
                  touched={touched.last_name}
                  handleChange={setFieldValue}
                  handleBlur={handleBlur}
                  placeholder="Last name"
                  type="givenName"
                  autoCapitalize="sentences"
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    columnGap: 8,
                    alignItems: "flex-start",
                  }}
                >
                  <View className="w-[38%]">
                    <Select
                      label="Phone Code"
                      name="phone_code"
                      value={values.phone_code as string}
                      errors={errors.phone_code}
                      touched={touched.phone_code}
                      handleChange={setFieldValue}
                      handleBlur={handleBlur}
                      placeholder="🇳🇬 +234"
                      items={countries?.map((country) => ({
                        label: `${country.emoji} ${country.phone_code}`,
                        value: country.phone_code,
                      }))}
                    />
                  </View>
                  <View className="w-[60%]">
                    <Input
                      label="Phone No"
                      name="phone_no"
                      value={values.phone_no as string}
                      errors={errors.phone_no}
                      touched={touched.phone_no}
                      handleChange={setFieldValue}
                      handleBlur={handleBlur}
                      placeholder="Phone No"
                      type="telephoneNumber"
                      mode="tel"
                    />
                  </View>
                </View>
                <Select
                  label="Country"
                  name="country_id"
                  value={values.country_id.toString()}
                  errors={errors.country_id}
                  touched={touched.country_id}
                  handleChange={setFieldValue}
                  handleBlur={handleBlur}
                  placeholder="Country"
                  items={countries?.map((country) => ({
                    label: `${country.emoji} ${country.name}`,
                    value: country.value,
                  }))}
                  setValue={setCount}
                />
                <Select
                  label="State "
                  name="state_id"
                  value={values.state_id.toString()}
                  errors={errors.state_id}
                  touched={touched.state_id}
                  handleChange={setFieldValue}
                  handleBlur={handleBlur}
                  placeholder="State"
                  items={states.map((state) => ({
                    label: state.name,
                    value: state.value,
                  }))}
                  setValue={setStat}
                />
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
                      label="City"
                      name="city_id"
                      value={values.city_id.toString()}
                      errors={errors.city_id}
                      touched={touched.city_id}
                      handleChange={setFieldValue}
                      handleBlur={handleBlur}
                      placeholder="City"
                      items={cities?.map((city) => ({
                        label: city.name,
                        value: city.value,
                      }))}
                    />
                  </View>
                  <View className="w-[50%]">
                    <Input
                      label="Postal Code"
                      name="postal_code"
                      value={values.postal_code}
                      errors={errors.postal_code}
                      touched={touched.postal_code}
                      handleChange={setFieldValue}
                      handleBlur={handleBlur}
                      placeholder="Postal Code"
                      type="postalCode"
                    />
                  </View>
                </View>

                <Input
                  label="Address"
                  name="street_line_one"
                  value={values.street_line_one}
                  errors={errors.street_line_one}
                  touched={touched.street_line_one}
                  handleChange={setFieldValue}
                  handleBlur={handleBlur}
                  placeholder="Address"
                  type="fullStreetAddress"
                />
              </View>
              <CheckBox
                name="is_default"
                label={
                  <View className="w-full flex-row items-center ">
                    <Text
                      className="text-mainBlack"
                      style={[globalStyles.semibold_text, { fontSize: 16 }]}
                    >
                      Set As Default Address
                    </Text>
                  </View>
                }
                errors={errors.is_default}
                touched={touched.is_default}
                value={values.is_default as boolean}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
              />
            </View>
            <Button
              text="Add Address"
              action={handleSubmit}
              disabled={!isValid}
              loading={isSubmitting}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default AddressForm;
