import { View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../Formik/Input";
import Select from "../../Formik/Picker";
import { Path, Svg } from "react-native-svg";
import { Country } from "../../../utils/interface";
import IconButton from "../../Common/IconButton";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import { setUserRegisterData } from "../../../redux/slices/user/signup";
import { useRouter } from "expo-router";

const signupSchema = yup.object().shape({
  first_name: yup.string().required("This field is required"),
  last_name: yup.string().required("This field is required"),
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
});

interface signupValues {
  first_name: string;
  last_name: string;
  email: string;
  phone_code: string;
  phone_no: string;
  password: string;
  confirm_password: string;
}

const BasicInfo: React.FC<{
  countries: Country[];
}> = ({ countries }) => {
  const { first_name, last_name, email, phone_no, phone_code, password } =
    useAppSelector((state) => state.userRegister.data);

  const initialValues: signupValues = {
    first_name,
    last_name,
    email,
    phone_no,
    phone_code,
    password,
    confirm_password: password,
  };

  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(setUserRegisterData({ data: values }));
        router.push("/user/register_two");
      }}
      validationSchema={signupSchema}
    >
      {({
        handleBlur,
        handleSubmit,
        errors,
        touched,
        values,
        setFieldValue,
      }) => (
        <View className="flex-1 w-full space-y-8 ">
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
                label="First Name"
                name="first_name"
                value={values.first_name}
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
                value={values.last_name}
                errors={errors.last_name}
                touched={touched.last_name}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Last name"
                type="givenName"
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
          </View>
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

export default BasicInfo;
