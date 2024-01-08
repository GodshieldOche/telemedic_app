import { Pressable, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../components/Formik/Input";
import Button from "../../components/Common/Button";
import { ScrollView } from "react-native-gesture-handler";
import useAppDispatch from "../../hooks/useDispatch";
import { postSignIn } from "../../redux/slices/user/signin";
import { messageAlert } from "../../components/Common/Alerts";
import { useRouter } from "expo-router";
import { postPractitionerSignIn } from "../../redux/slices/practitioner/practitioner_signin";

const signinSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email address is incorrect")
    .required("This field is required."),
  password: yup.string().required("This field is required."),
});

interface signinValues {
  email: string;
  password: string;
}

const SignIn: React.FC<{ handleCreateAccount: () => void }> = ({
  handleCreateAccount,
}) => {
  const [activeTab, setActiveTab] = React.useState("Patient");
  const initialValues: signinValues = {
    email: "",
    password: "",
  };

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handlePatientLogin = async (
    values: signinValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const res = await dispatch(postSignIn(values));
    if (res.error) {
      setSubmitting(false);
      messageAlert(
        "Error",
        (res?.payload && res?.payload[0]?.error) || "Something went wrong"
      );
      return;
    }
    setSubmitting(false);
    router.replace("/(user)/(tabs)/");
  };

  const handlePractitionerLogin = async (
    values: signinValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const res = await dispatch(postPractitionerSignIn(values));
    if (res.error) {
      setSubmitting(false);
      messageAlert(
        "Error",
        (res?.payload && res?.payload[0]?.error) || "Something went wrong"
      );
      return;
    }
    setSubmitting(false);
    router.replace("/(practitioner)/(tabs)/");
  };

  const tabs = {
    Patient: handlePatientLogin,
    Practitioner: handlePractitionerLogin,
  };

  return (
    <View className="flex-1">
      <View className=" p-4 items-center flex flex-col space-y-7">
        <Text
          className="text-xl text-mainBlack "
          style={globalStyles.semibold_text}
        >
          Sign In
        </Text>
      </View>
      <ScrollView className="px-4">
        <View className="flex-1 pt-2 pb-6 w-full">
          <View className="w-full flex-row">
            {Object.keys(tabs).map((tab) => (
              <Pressable
                className="bg-primaryTwo px-4 w-[50%] rounded-t-md justify-center items-center py-3 "
                style={{
                  backgroundColor: activeTab === tab ? "#F2EFFF" : "#fff",
                }}
                onPress={() => setActiveTab(tab)}
                key={tab}
              >
                <Text
                  className="text-base text-primaryOne"
                  style={[
                    activeTab === tab
                      ? globalStyles.bold_text
                      : globalStyles.regular_text,
                    {
                      color: activeTab === tab ? "#8863F2" : "#545D69",
                    },
                  ]}
                >
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              await tabs[activeTab as keyof typeof tabs](values, setSubmitting);
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
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  rowGap: 13,
                }}
              >
                <View
                  className="bg-primaryTwo px-4 py-8"
                  style={{
                    flexDirection: "column",
                    rowGap: 16,
                  }}
                >
                  <Input
                    label="Email"
                    name="email"
                    value={values.email}
                    errors={errors.email}
                    touched={touched.email}
                    handleChange={setFieldValue}
                    handleBlur={handleBlur}
                    placeholder="Enter email address"
                    type="emailAddress"
                    mode="email"
                  />
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

                  <Pressable>
                    <Text
                      className="text-base w-full text-right"
                      style={[globalStyles.regular_text]}
                    >
                      Forgot Password?
                    </Text>
                  </Pressable>
                </View>
                <View className="flex space-y-4">
                  <Button
                    action={handleSubmit}
                    text="Sign In"
                    loading={isSubmitting}
                    disabled={!isValid}
                  />

                  <View className="flex w-full items-center space-y-6 ">
                    <View className="w-full flex-row items-center justify-center ">
                      <Text
                        style={[globalStyles.regular_text, { fontSize: 16 }]}
                      >
                        Don't have an account?{" "}
                      </Text>
                      <Pressable onPress={handleCreateAccount}>
                        <Text
                          className="text-primaryOne "
                          style={[globalStyles.bold_text, { fontSize: 16 }]}
                        >
                          Create Account
                        </Text>
                      </Pressable>
                    </View>
                    <Text
                      className="text-[11px] text-center"
                      style={globalStyles.semibold_text}
                    >
                      By continuing, you acknowledge that you have read and
                      understood, and agree to Terms of service and Privacy
                      Policy
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;
