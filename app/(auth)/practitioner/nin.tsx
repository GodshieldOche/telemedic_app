import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../../../constants/styles";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../../components/Formik/Input";
import Button from "../../../components/Common/Button";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import {
  setPractitionerFiles,
  setPractitionerRegisterData,
} from "../../../redux/slices/practitioner/practitioner_signup";
import { router } from "expo-router";

const signinSchema = yup.object().shape({
  nin: yup
    .string()
    .min(11, "Number must be at least 11 Characters long")
    .max(11, "Number must be at most 11 Characters long")
    .required("This field is required."),
});

const NIN = () => {
  const dispatch = useAppDispatch();
  const {
    data: { nin },
  } = useAppSelector((state) => state.practitionerRegister);
  return (
    <Formik
      initialValues={{
        nin: nin || "",
      }}
      onSubmit={async ({ nin }, { setSubmitting }) => {
        dispatch(
          setPractitionerFiles({
            data: {
              driving_licence: undefined,
              international_passport: undefined,
            },
          })
        );
        dispatch(
          setPractitionerRegisterData({
            data: {
              nin,
            },
          })
        );
        setSubmitting(false);
        router.push("/practitioner/register_three");
      }}
      validationSchema={signinSchema}
      validateOnMount
    >
      {({
        setFieldValue,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        values,
        isSubmitting,
        isValid,
      }) => (
        <View className="flex-1 py-6 px-4 bg-white space-y-12">
          <View className="justify-center items-center space-y-2 px-5 ">
            <Text className="text-[23px] " style={[globalStyles.semibold_text]}>
              NIN
            </Text>
            <Text
              className="text-sm text-[#545D69] text-center"
              style={[globalStyles.regular_text]}
            >
              Enter you National Identification number to confirm your
              identification
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              rowGap: 16,
            }}
          >
            <Input
              label="NIN"
              name="nin"
              value={values.nin}
              errors={errors.nin}
              touched={touched.nin}
              handleChange={setFieldValue}
              handleBlur={handleBlur}
              placeholder="Enter NIN"
              type="none"
              mode="numeric"
            />
          </View>

          <View className="flex space-y-4">
            <Button
              action={handleSubmit}
              text="Confirm"
              loading={isSubmitting}
              disabled={!isValid}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default NIN;
