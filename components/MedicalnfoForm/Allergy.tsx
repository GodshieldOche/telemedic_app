import { Pressable, Text, View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../Formik/Input";
import { Allergy } from "../../utils/interface";
import Button from "../Common/Button";
import { globalStyles } from "../../constants/styles";

const allergySchema = yup.object().shape({
  agent: yup.string().required("This field is required"),
  reactions: yup.array(yup.string()).required("This field is required"),
});

const AllergyForm: React.FC<{
  data: Allergy;
  handleSubmit: (
    values: Allergy,
    setSubmitting?: ((isSubmitting: boolean) => void) | undefined
  ) => Promise<void>;
}> = ({ data, handleSubmit }) => {
  const { reactions, agent } = data;

  const initialValues = {
    agent,
    reactions,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
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
              <Input
                label="Substance or Agent"
                name="agent"
                value={values.agent}
                errors={errors.agent}
                touched={touched.agent}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
                placeholder="Substance or Agent"
                type="name"
                autoCapitalize="sentences"
              />
              {values.reactions.map((_, index) => (
                <Input
                  key={index}
                  label={`Reaction ${index + 1}`}
                  name={`reactions.${index}`}
                  value={values.reactions[index]}
                  errors={errors.reactions}
                  touched={touched.reactions}
                  handleChange={setFieldValue}
                  handleBlur={handleBlur}
                  placeholder="Reaction"
                  type="name"
                  autoCapitalize="sentences"
                />
              ))}
              <Pressable>
                <Text
                  className="text-[13px] text-primaryOne "
                  style={[globalStyles.semibold_text]}
                  onPress={() =>
                    setFieldValue("reactions", [
                      ...values.reactions.filter((v) => v !== ""),
                      "",
                    ])
                  }
                >
                  Add Another Reaction
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

export default AllergyForm;
