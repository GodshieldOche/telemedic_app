import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import Button from "../../../components/Common/Button";
import { setPractitionerRegisterData } from "../../../redux/slices/practitioner/practitioner_signup";
import { router } from "expo-router";
import Input from "../../../components/Formik/Input";
import { globalStyles } from "../../../constants/styles";

const hourlyRateSchema = yup.object().shape({
  hourly_rate: yup.number().positive().required("This field is required."),
});

const HourlyRate = () => {
  const dispatch = useAppDispatch();
  const {
    data: { hourly_rate },
  } = useAppSelector((state) => state.practitionerRegister);
  return (
    <ScrollView className="bg-white py-6 px-4 flex-1">
      <Formik
        initialValues={{
          hourly_rate: hourly_rate || 0,
        }}
        onSubmit={async ({ hourly_rate }, { setSubmitting }) => {
          dispatch(
            setPractitionerRegisterData({
              data: {
                hourly_rate,
              },
            })
          );
          setSubmitting(false);
          router.back();
        }}
        validationSchema={hourlyRateSchema}
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
          <View className="space-y-14">
            <View
              className="bg-primaryGray flex-1 p-4 rounded-lg "
              style={{
                flex: 1,
                flexDirection: "column",
                rowGap: 24,
              }}
            >
              <View
                style={{
                  rowGap: 8,
                }}
              >
                <Input
                  label="Hourly Rate (₦)"
                  name="hourly_rate"
                  value={values.hourly_rate.toString()}
                  errors={errors.hourly_rate}
                  touched={touched.hourly_rate}
                  handleChange={setFieldValue}
                  handleBlur={handleBlur}
                  placeholder=""
                  type="none"
                  autoCapitalize="sentences"
                />
                <Text
                  className="text-[13px] text-secondarySix pl-4 "
                  style={[globalStyles.regular_text]}
                >
                  Total amount the client will see
                </Text>
              </View>
              <View className="px-4 space-y-4">
                <Text
                  className=" text-mainBlack "
                  style={[globalStyles.semibold_text, globalStyles.normal_text]}
                >
                  -{(Number(values.hourly_rate) * 10) / 100}
                </Text>
                <Text
                  className="text-[13px] text-secondarySix "
                  style={[globalStyles.regular_text]}
                >
                  10% Service fee
                </Text>
              </View>
              <Input
                label="You’ll Receive"
                name="hourly_rate"
                value={(
                  values.hourly_rate -
                  (Number(values.hourly_rate) * 10) / 100
                )
                  .toFixed()
                  .toString()}
                errors={null}
                touched={touched.hourly_rate}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder=""
                type="none"
                autoCapitalize="sentences"
                disabled
              />
            </View>
            <View className="px-4">
              <Button
                action={handleSubmit}
                text="Save"
                loading={isSubmitting}
                disabled={!isValid}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default HourlyRate;
