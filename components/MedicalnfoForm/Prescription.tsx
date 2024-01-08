import { Pressable, Text, View } from "react-native";
import React from "react";
import { Formik, FormikErrors, FormikTouched } from "formik";
import * as yup from "yup";
import Input from "../Formik/Input";
import { Categorish, Prescription } from "../../utils/interface";
import Button from "../Common/Button";
import DateTime from "../Formik/Date";
import TextArea from "../Formik/TextArea";
import Select from "../Formik/Picker";
import { partsoftheday } from "../../utils/data";
import { globalStyles } from "../../constants/styles";
import MediaPicker from "../Formik/MediaPicker";

const allergySchema = yup.object().shape({
  medication_id: yup.string().required("This field is required"),
  name: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  start_date: yup.date().required("This field is required"),
  end_date: yup.date().required("This field is required"),
  time_segments: yup
    .array(
      yup.object({
        part_of_day: yup.string().required("This field is required"),
        quantity: yup.number().positive().required("This field is required"),
        time: yup.date().required("This field is required"),
      })
    )
    .required("This field is required"),
  medication_image: yup.object().required("This field is required"),
});

type TimeSegError = FormikErrors<{
  part_of_day: string;
  quantity: number;
  time: any;
}>[];
type TimeSegTouched = FormikTouched<{
  part_of_day: string;
  quantity: number;
  time: any;
}>[];

const PrescriptionForm: React.FC<{
  data: Prescription;
  medications: Categorish[];
  handleSubmit: (
    values: Prescription,
    setSubmitting?: ((isSubmitting: boolean) => void) | undefined
  ) => Promise<void>;
}> = ({ data, handleSubmit, medications }) => {
  const {
    medication_id,
    name,
    description,
    end_date,
    start_date,
    time_segments,
    created_by,
    medication_image,
  } = data;

  const initialValues = {
    medication_id,
    name,
    description,
    end_date: end_date ? new Date(end_date) : end_date,
    start_date: start_date ? new Date(start_date) : start_date,
    time_segments: time_segments.map((seg) => ({
      ...seg,
      time: seg.time ? new Date(seg.time) : seg.time,
    })),
    created_by,
    medication_image,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(
          {
            ...values,
            start_date: values.start_date?.toISOString().toString(),
            end_date: values.end_date?.toISOString().toString(),
            time_segments: values.time_segments.map((seg) => ({
              ...seg,
              time: seg.time?.toISOString().toString(),
              quantity: Number(seg.quantity),
            })),
          },
          setSubmitting
        );
      }}
      validationSchema={allergySchema}
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
        validateForm,
      }) => (
        <View
          className="flex-1 w-full "
          style={{
            rowGap: 32,
          }}
        >
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
              <Select
                label="Medication"
                name="medication_id"
                value={values.medication_id}
                errors={errors.medication_id}
                touched={touched.medication_id}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Medication"
                items={medications?.map(({ name, id }) => ({
                  label: name,
                  value: id,
                }))}
              />
              <Input
                label="Name"
                name="name"
                value={values.name}
                errors={errors.name}
                touched={touched.name}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Name"
                type="name"
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
                <View className="w-[49%]">
                  <DateTime
                    label="Start Date"
                    name="start_date"
                    value={values.start_date}
                    errors={errors.start_date}
                    touched={touched.start_date}
                    handleChange={setFieldValue}
                    handleBlur={handleBlur}
                    placeholder="00/00/0000"
                  />
                </View>
                <View className="w-[49%]">
                  <DateTime
                    label="End Date"
                    name="end_date"
                    value={values.end_date}
                    errors={errors.end_date}
                    touched={touched.end_date}
                    handleChange={setFieldValue}
                    handleBlur={handleBlur}
                    placeholder="00/00/0000"
                  />
                </View>
              </View>

              <MediaPicker
                label="Medication Image"
                name="medication_image"
                type="Images"
                values={[values.medication_image]}
                errors={errors.medication_image}
                touched={touched.medication_image}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
              />
            </View>
            <View className="space-y-8">
              {values.time_segments.map((_, index) => (
                <View
                  key={index}
                  style={{
                    rowGap: 16,
                    borderTopWidth: 0.3,
                    borderTopColor: "#A5ABB3",
                    paddingTop: 24,
                  }}
                >
                  <Select
                    label="Part of the day"
                    name={`time_segments.${index}.part_of_day`}
                    value={values.time_segments[index].part_of_day.toString()}
                    errors={
                      (errors.time_segments as TimeSegError)?.[index]
                        ?.part_of_day
                    }
                    touched={
                      (errors.time_segments as TimeSegTouched)?.[index]
                        ?.part_of_day
                    }
                    handleChange={setFieldValue}
                    handleBlur={handleBlur}
                    placeholder="Select Part of the day"
                    items={Object.keys(partsoftheday).map((key) => ({
                      label:
                        partsoftheday[key as keyof typeof partsoftheday].label,
                      value:
                        partsoftheday[key as keyof typeof partsoftheday].value,
                    }))}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      columnGap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    <View className="w-[49%]">
                      <Input
                        label="Quantity"
                        name={`time_segments.${index}.quantity`}
                        value={values.time_segments[index].quantity.toString()}
                        errors={
                          (errors.time_segments as TimeSegError)?.[index]
                            ?.quantity
                        }
                        touched={
                          (errors.time_segments as TimeSegTouched)?.[index]
                            ?.quantity
                        }
                        handleChange={setFieldValue}
                        handleBlur={handleBlur}
                        placeholder="Quantity"
                        type="name"
                        autoCapitalize="sentences"
                      />
                    </View>
                    <View className="w-[49%]">
                      <DateTime
                        label="Time"
                        name={`time_segments.${index}.time`}
                        value={values.time_segments[index].time}
                        errors={
                          (errors.time_segments as TimeSegError)?.[index]?.time
                        }
                        touched={
                          (errors.time_segments as TimeSegTouched)?.[index]
                            ?.time
                        }
                        handleChange={setFieldValue}
                        handleBlur={handleBlur}
                        placeholder="0:00 AM"
                        mode="time"
                      />
                    </View>
                  </View>
                </View>
              ))}
              <Pressable>
                <Text
                  className="text-[13px] text-primaryOne "
                  style={[globalStyles.semibold_text]}
                  onPress={() =>
                    setFieldValue("time_segments", [
                      ...values.time_segments,
                      {
                        part_of_day: "",
                        quantity: "",
                        time: undefined,
                      },
                    ])
                  }
                >
                  Add Another
                </Text>
              </Pressable>
            </View>
          </View>
          <Button
            text="Save"
            loading={isSubmitting}
            disabled={!isValid}
            action={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
};

export default PrescriptionForm;
