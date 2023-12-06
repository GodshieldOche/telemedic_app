import { Text, View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "../Common/Button";
import MediaPicker from "../Formik/MediaPicker";
import { BannerProfile } from "../../utils/interface";
import { globalStyles } from "../../constants/styles";

const bannrProfileSchema = yup.object().shape({
  banner_image: yup.object().required("This field is required"),
  profile_image: yup.object().required("This field is required"),
});

const BannerProfileForm: React.FC<{
  data: BannerProfile;
  handleSubmit: (
    values: BannerProfile,
    setSubmitting: (isSubmitting: boolean) => void
  ) => void;
}> = ({ data, handleSubmit }) => {
  const { banner_image, profile_image } = data;

  const initialValues = {
    banner_image,
    profile_image,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
      validationSchema={bannrProfileSchema}
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
          className="flex-auto h-full w-full py-10 "
          style={{
            rowGap: 32,
          }}
        >
          <View
            className="flex-auto h-full w-full bg-primaryGray px-4 py-5 rounded-lg"
            style={{
              flex: 1,
              flexDirection: "column",
              rowGap: 32,
            }}
          >
            <View>
              <Text style={[globalStyles.regular_text, { fontSize: 16 }]}>
                These are the first images a patient sees when clicking on your
                profile
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                rowGap: 16,
              }}
            >
              <MediaPicker
                label="Banner Image"
                name="banner_image"
                type="Images"
                values={[values.banner_image]}
                errors={errors.banner_image}
                touched={touched.banner_image}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
              />
              <MediaPicker
                label="Profile Image"
                name="profile_image"
                type="Images"
                values={[values.profile_image]}
                errors={errors.profile_image}
                touched={touched.profile_image}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
              />
            </View>
          </View>
          <Button
            text="Finish"
            loading={isSubmitting}
            disabled={!isValid}
            action={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
};

export default BannerProfileForm;
