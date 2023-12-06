import { View } from "react-native";
import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import Input from "../../../../components/Formik/Input";
import Button from "../../../../components/Common/Button";

const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  new_password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirm_new_password: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("new_password")], "Passwords must match"),
});

interface changePasswordValues {
  password: string;
  new_password: string;
  confirm_new_password: string;
}

const ChangePassword = () => {
  const initialValues: changePasswordValues = {
    password: "",
    new_password: "",
    confirm_new_password: "",
  };
  return (
    <View className="flex-1  h-full w-full py-6 px-4  bg-white">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {}}
        validationSchema={changePasswordSchema}
        validateOnMount
      >
        {({
          handleBlur,
          handleSubmit,
          errors,
          touched,
          values,
          setFieldValue,
          isValid,
        }) => (
          <View className="space-y-9">
            <View
              className="  w-full bg-primaryGray px-4 py-6 rounded-lg"
              style={{
                flexDirection: "column",
                rowGap: 16,
              }}
            >
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
                label="New Password"
                name="new_password"
                value={values.new_password}
                errors={errors.new_password}
                touched={touched.new_password}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Enter New Password"
                type="password"
                secureTextEntry={true}
              />
              <Input
                label="Confirm New Password"
                name="confirm_new_password"
                value={values.confirm_new_password}
                errors={errors.confirm_new_password}
                touched={touched.confirm_new_password}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Enter password"
                type="password"
                secureTextEntry={true}
              />
            </View>
            <View className="px-4">
              <Button
                text="Update Passowrd"
                disabled={!isValid}
                action={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ChangePassword;
