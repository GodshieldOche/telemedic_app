import { Text, View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Button from "../Common/Button";
import MediaPicker from "../Formik/MediaPicker";
import { Gallery } from "../../utils/interface";
import { globalStyles } from "../../constants/styles";

const galleryschema = yup.object().shape({
  images: yup
    .array(yup.object())
    .min(2, "You are to provide at least 2 images")
    .max(4, "You are to provide at most 4 images")
    .required("This field is required"),
  videos: yup.array(yup.object()),
});

const GalleryForm: React.FC<{
  data: Gallery;
  handleSubmit: (
    values: Gallery,
    setSubmitting: (isSubmitting: boolean) => void
  ) => void;
}> = ({ data, handleSubmit }) => {
  const { images, videos } = data;

  const initialValues = {
    images,
    videos,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
      validationSchema={galleryschema}
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
          className="flex-auto h-full w-full "
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
                These are the image(s) and video(s) a patient would see
                concerning you and what you do
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                rowGap: 16,
              }}
            >
              <MediaPicker
                label="Images"
                name="images"
                type="Images"
                values={values.images}
                errors={errors.images}
                touched={touched.images}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                limit={4}
                multiple
              />
              <MediaPicker
                label="Videos"
                name="videos"
                type="Videos"
                values={values.videos}
                errors={errors.videos}
                touched={touched.videos}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                limit={2}
                multiple
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

export default GalleryForm;
