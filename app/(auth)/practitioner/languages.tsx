import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import Button from "../../../components/Common/Button";
import { setPractitionerRegisterData } from "../../../redux/slices/practitioner/practitioner_signup";
import { router } from "expo-router";
import Select from "../../../components/Formik/Picker";
import { getLanguages } from "../../../redux/slices/app/languages";
import Loader from "../../../components/Common/Loader";

const languagesSchema = yup.object().shape({
  languages: yup.array(yup.string()).min(1).required("This field is required."),
});

const Languages = () => {
  const dispatch = useAppDispatch();
  const {
    data: { languages },
  } = useAppSelector((state) => state.practitionerRegister);
  const { data, loading } = useAppSelector((state) => state.languages);

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView className="bg-white py-6 px-4 flex-1">
      <Formik
        initialValues={{
          languages: [...languages.map((language) => language.id)],
        }}
        onSubmit={async ({ languages }, { setSubmitting }) => {
          const newlanguages = languages.map(
            (language) => data[data.findIndex((item) => item.id === language)]
          );

          dispatch(
            setPractitionerRegisterData({
              data: {
                languages: newlanguages,
              },
            })
          );
          setSubmitting(false);
          router.back();
        }}
        validationSchema={languagesSchema}
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
              <Select
                label="Practice"
                name="languages"
                value={values.languages}
                errors={errors.languages}
                touched={touched.languages}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Select practice"
                items={data?.map((language) => ({
                  label: language.name,
                  value: language.id,
                }))}
                mode="MULTI"
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

export default Languages;
