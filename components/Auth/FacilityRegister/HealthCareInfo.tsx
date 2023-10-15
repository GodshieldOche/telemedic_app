import { Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../Formik/Input";
import Select from "../../Formik/Picker";
import { Path, Svg } from "react-native-svg";
import { Categorish, Country } from "../../../utils/interface";
import IconButton from "../../Common/IconButton";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import { useRouter } from "expo-router";
import { setFacilityRegisterData } from "../../../redux/slices/facility/facility_signup";
import TextArea from "../../Formik/TextArea";
import TagsInput from "../../Formik/TagsInput";
import { getStates } from "../../../redux/slices/app/state";
import { getCities, resetCities } from "../../../redux/slices/app/cities";
import CheckBox from "../../Formik/Checkbox";
import { globalStyles } from "../../../constants/styles";

const facilitySignupSchema = yup.object().shape({
  facility_type_id: yup.string().required("This field is required"),
  name: yup.string().required("This field is required"),
  services: yup
    .array(yup.string())
    .min(1, "This field must have at least one items")
    .required("This field is required"),
  description: yup.string().required("This field is required"),
  phone_code: yup.string().required("Required"),
  phone_no: yup
    .string()
    .min(10, "Must be at least 10 digits long")
    .required("This field is required"),
  email: yup
    .string()
    .email("Email address is incorrect")
    .required("This field is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirm_password: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  postal_code: yup.string().required("This field is required"),
  street_line_one: yup.string().required("This field is required"),
  country_id: yup.string().required("This field is required"),
  state_id: yup.string().required("This field is required"),
  city_id: yup.string().required("This field is required"),
  read: yup
    .boolean()
    .isTrue("You must read and acknowledge the terms and conditions")
    .required("You must read and acknowledge the terms and conditions"),
});

interface facilitySignupValues {
  email: string;
  password: string;
  name: string;
  description: string;
  facility_type_id: string;
  phone_code: string;
  phone_no: string;
  services: string[];
  confirm_password: string;
  country_id: string | number;
  state_id: string | number;
  city_id: string | number;
  postal_code: string;
  street_line_one: string;
  read: boolean;
}

const HealthCareInfo: React.FC<{
  types: Categorish[];
  countries: Country[];
}> = ({ types, countries }) => {
  const {
    name,
    services,
    facility_type_id,
    description,
    email,
    phone_no,
    phone_code,
    password,
    address: { country_id, state_id, city_id, postal_code, street_line_one },
  } = useAppSelector((state) => state.facilityRegister.data);

  const initialValues: facilitySignupValues = {
    name,
    facility_type_id,
    description,
    services,
    email,
    phone_no,
    phone_code,
    password,
    country_id,
    state_id,
    city_id,
    postal_code,
    street_line_one,
    confirm_password: password,
    read: false,
  };

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [count, setCount] = useState(null);
  const [stat, setStat] = useState(null);

  const { data: states } = useAppSelector((state) => state.state);
  const { data: cities } = useAppSelector((state) => state.city);

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
      onSubmit={(values) => {
        const data = {
          name: values.name,
          email: values.email,
          facility_type_id: values.facility_type_id,
          description: values.description,
          services: values.services,
          phone_code: values.phone_code,
          phone_no: values.phone_no,
          password: values.password,
          address: {
            city_id: values.city_id,
            country_id: values.country_id,
            state_id: values.state_id,
            postal_code: values.postal_code,
            street_line_one: values.street_line_one,
          },
        };
        dispatch(setFacilityRegisterData({ data }));
        router.push("/(auth)/facility/register_two");
      }}
      validationSchema={facilitySignupSchema}
    >
      {({
        handleBlur,
        handleSubmit,
        errors,
        touched,
        values,
        setFieldValue,
      }) => (
        <View
          className="flex-1 w-full space-y-8 "
          style={{
            rowGap: 32,
          }}
        >
          <View
            className=" h-full w-full bg-primaryGray px-4 py-5 rounded-lg"
            style={{
              flex: 1,
              flexDirection: "column",
              rowGap: 16,
            }}
          >
            <Select
              label="Facility Type"
              name="facility_type_id"
              value={values.facility_type_id}
              errors={errors.facility_type_id}
              touched={touched.facility_type_id}
              handleChange={setFieldValue}
              handleBlur={handleBlur}
              placeholder="Facility type"
              items={types?.map((type) => ({
                label: type.name,
                value: type.id,
              }))}
            />
            <Input
              label="Facility Name"
              name="name"
              value={values.name}
              errors={errors.name}
              touched={touched.name}
              handleChange={setFieldValue}
              handleBlur={handleBlur}
              placeholder="Facility name"
              type="name"
              autoCapitalize="sentences"
            />

            <Input
              label="Email Address"
              name="email"
              value={values.email}
              errors={errors.email}
              touched={touched.email}
              handleChange={setFieldValue}
              handleBlur={handleBlur}
              placeholder="Enter email address"
              type="emailAddress"
              mode="email"
            />
            <TagsInput
              label="Services"
              name="services"
              values={values.services}
              errors={errors.services}
              touched={touched.services}
              handleChange={setFieldValue}
              handleBlur={handleBlur}
              placeholder="Type in Service and Hit enter"
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
              placeholder="Description"
              type="none"
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
                  value={values.phone_code}
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
                  value={values.phone_no}
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
              setValue={setCount}
            />
            <Select
              label="State "
              name="state_id"
              value={values.state_id}
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
                  value={values.city_id}
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

            <Input
              label="Password"
              name="password"
              value={values.password}
              errors={errors.password}
              touched={touched.password}
              handleChange={setFieldValue}
              handleBlur={handleBlur}
              placeholder="Enter password"
              type="password"
              secureTextEntry={true}
            />
            <Input
              label="Confirm Password"
              name="confirm_password"
              value={values.confirm_password}
              errors={errors.confirm_password}
              touched={touched.confirm_password}
              handleChange={setFieldValue}
              handleBlur={handleBlur}
              placeholder="Confirm password"
              type="password"
              secureTextEntry={true}
            />
          </View>
          <CheckBox
            name="read"
            label={
              <View className="w-full flex-row items-center ">
                <Text style={[globalStyles.regular_text, { fontSize: 16 }]}>
                  I have read and accepted{" "}
                </Text>
                <Pressable
                  onPress={() => router.push("/(auth)/terms_and_condtions")}
                >
                  <Text
                    className="text-primaryOne "
                    style={[globalStyles.bold_text, { fontSize: 16 }]}
                  >
                    the terms & conditions
                  </Text>
                </Pressable>
              </View>
            }
            errors={errors.read}
            touched={touched.read}
            value={values.read}
            handleChange={setFieldValue}
            handleBlur={handleBlur}
          />
          <View className="flex-1 w-full flex-row justify-end">
            <IconButton
              SVG={
                <Svg width="28" height="28" color="#fff" viewBox="0 0 24 24">
                  <Path
                    fill="currentColor"
                    d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"
                  />
                </Svg>
              }
              action={handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default HealthCareInfo;
