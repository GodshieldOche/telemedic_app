import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import TextArea from "../../../components/Formik/TextArea";
import Button from "../../../components/Common/Button";
import { setPractitionerRegisterData } from "../../../redux/slices/practitioner/practitioner_signup";
import { router } from "expo-router";

const signinSchema = yup.object().shape({
  description: yup.string().required("This field is required."),
});

const about = () => {
  const dispatch = useAppDispatch();
  const {
    data: { description },
  } = useAppSelector((state) => state.practitionerRegister);
  return (
    <ScrollView className="bg-white py-6 px-4 flex-1">
      <Formik
        initialValues={{
          description: description || "",
        }}
        onSubmit={async ({ description }, { setSubmitting }) => {
          dispatch(
            setPractitionerRegisterData({
              data: {
                description,
              },
            })
          );
          setSubmitting(false);
          router.back();
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
          <View className="space-y-14">
            <View className="bg-primaryGray flex-1 p-4 rounded-lg ">
              <TextArea
                label="About"
                name="description"
                value={values.description}
                errors={errors.description}
                touched={touched.description}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Write something appealing about yourself for a potential client to see"
                type="none"
                autoCapitalize="sentences"
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

export default about;
