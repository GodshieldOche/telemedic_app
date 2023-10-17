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
  const initialValues: signinValues = {
    email: "",
    password: "",
  };

  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <ScrollView className="">
      <View className=" p-6 items-center flex flex-col space-y-7">
        <Text
          className="text-xl text-mainBlack "
          style={globalStyles.semibold_text}
        >
          Sign In
        </Text>

        <View className="flex-1 w-full">
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              const res = await dispatch(postSignIn(values));
              if (res.error) {
                setSubmitting(false);
                messageAlert(
                  "Error",
                  (res?.payload && res?.payload[0]?.error) ||
                    "Something went wrong"
                );
                return;
              }
              resetForm();
              setSubmitting(false);
              router.replace("/(user)/");
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
                    <Text className="text-base w-full text-right">
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
                      className="text-xs text-center"
                      style={globalStyles.regular_text}
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
      </View>
    </ScrollView>
  );
};

export default SignIn;
