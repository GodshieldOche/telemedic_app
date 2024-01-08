import { View } from "react-native";
import React, { useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import Input from "../../../../components/Formik/Input";
import Button from "../../../../components/Common/Button";
import { Practitioner } from "../../../../utils/interface";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import { ScrollView } from "react-native-gesture-handler";
import Select from "../../../../components/Formik/Picker";
import { getCountries } from "../../../../redux/slices/app/country";
import Loader from "../../../../components/Common/Loader";
import { messageAlert } from "../../../../components/Common/Alerts";
import { router } from "expo-router";
import { updatePractitionerProfile } from "../../../../redux/slices/practitioner/profile";
import TextArea from "../../../../components/Formik/TextArea";

const changePasswordSchema = yup.object().shape({
  first_name: yup.string().required("This field is required"),
  last_name: yup.string().required("This field is required"),
  email: yup.string().required("This field is required"),
});

const EditPersonalInformation = () => {
  const data = useAppSelector((state) => state.practitionerProfile).data!;
  const initialValues: Practitioner = {
    ...data,
  };

  const { loading, data: countries } = useAppSelector((state) => state.country);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <View className="flex-1  h-full w-full py-6   bg-white">
      <ScrollView className="px-4">
        <Formik
          initialValues={initialValues}
          onSubmit={async (
            { phone_code, phone_no, description },
            { setSubmitting }
          ) => {
            const body = {
              phone_code,
              phone_no,
              description,
            };

            Object.keys(body).forEach((key) => {
              if (
                body[key as keyof typeof body] ===
                data[key as keyof Practitioner]
              ) {
                delete body[key as keyof typeof body];
              }
            });

            const res = await dispatch(updatePractitionerProfile(body));

            if (res.error) {
              messageAlert(
                "Error",
                (res?.payload && res?.payload[0]?.error) ||
                  "Something went wrong"
              );
              return setSubmitting(false);
            }

            setSubmitting(false);
            router.back();
          }}
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
            isSubmitting,
          }) => (
            <View className="space-y-9 pb-5">
              <View
                className="  w-full bg-primaryGray px-4 py-6 rounded-lg"
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
                  placeholder="Enter first name"
                  type="familyName"
                  disabled
                />
                <Input
                  label="Last Name"
                  name="last_name"
                  value={values.last_name}
                  errors={errors.last_name}
                  touched={touched.last_name}
                  handleChange={setFieldValue}
                  handleBlur={handleBlur}
                  placeholder="Enter last name"
                  type="givenName"
                  disabled
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
                  disabled
                />
              </View>
              <View
                className="  w-full bg-primaryGray px-4 py-6 rounded-lg"
                style={{
                  flexDirection: "column",
                  rowGap: 16,
                }}
              >
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
                {/* <Select
                  label="Gender"
                  name="gender"
                  value={values.gender}
                  errors={errors.gender}
                  touched={touched.gender}
                  handleChange={setFieldValue}
                  handleBlur={handleBlur}
                  placeholder="Select Gender"
                  items={[
                    { label: "", value: "" },
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                  useWheel={true}
                  showSearch={false}
                /> */}
              </View>
              <View className="px-4">
                <Button
                  text="Update Information"
                  disabled={!isValid}
                  action={handleSubmit}
                  loading={isSubmitting}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default EditPersonalInformation;
