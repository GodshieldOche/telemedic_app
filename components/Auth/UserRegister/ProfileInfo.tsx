import { Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Input from "../../Formik/Input";
import Select from "../../Formik/Picker";
import { Path, Svg } from "react-native-svg";
import { Country, RegisterData } from "../../../utils/interface";
import IconButton from "../../Common/IconButton";
import DateTime from "../../Formik/Date";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import { getStates } from "../../../redux/slices/app/state";
import { getCities, resetCities } from "../../../redux/slices/app/cities";
import { messageAlert } from "../../Common/Alerts";
import { useRouter } from "expo-router";
import { setUserRegisterData } from "../../../redux/slices/user/signup";
import CheckBox from "../../Formik/Checkbox";
import { globalStyles } from "../../../constants/styles";
import { ScrollView } from "react-native-gesture-handler";

const signupSchema = yup.object().shape({
  gender: yup.string().required("This field is required"),
  dob: yup.date().required("This field is required"),
  postal_code: yup.string().required("This field is required"),
  street_line_one: yup.string().required("This field is required"),
  country_id: yup.string().required("This field is required"),
  state_id: yup.string().required("This field is required"),
  city_id: yup.string().required("This field is required"),
  read: yup
    .boolean()
    .isTrue("You must read and acknowledge the terms and conditions")
    .required("You must read and acknowledge the terms and conditions"),
});

interface signupValues {
  gender: string;
  dob: Date | undefined;
  postal_code: string;
  street_line_one: string;
  country_id: string | number;
  state_id: string | number;
  city_id: string | number;
  read: boolean;
}

const ProfileInfo: React.FC<{
  countries: Country[];
  handleRegister: (body: RegisterData) => Promise<any>;
}> = ({ countries, handleRegister }) => {
  const { data } = useAppSelector((state) => state.userRegister);

  const {
    gender,
    dob,
    address: { postal_code, street_line_one, country_id, state_id, city_id },
  } = data;

  const initialValues: signupValues = {
    gender,
    dob: dob ? new Date(dob) : dob,
    postal_code,
    street_line_one,
    country_id,
    state_id,
    city_id,
    read: false,
  };

  const [count, setCount] = useState(null);
  const [stat, setStat] = useState(null);

  const { data: states } = useAppSelector((state) => state.state);
  const { data: cities } = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!count) {
      return;
    }
    dispatch(getStates(count));
    dispatch(resetCities());
  }, [count]);

  useEffect(() => {
    if (!stat) {
      return;
    }
    dispatch(getCities(stat));
  }, [stat]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (
        {
          dob,
          gender,
          city_id,
          state_id,
          country_id,
          postal_code,
          street_line_one,
        },
        { setSubmitting }
      ) => {
        const values = {
          dob: dob?.toISOString().toString(),
          gender,
          address: {
            country_id,
            state_id,
            city_id,
            postal_code,
            street_line_one,
          },
        };
        dispatch(setUserRegisterData({ data: values }));

        const body: RegisterData = {
          ...data,
          dob: dob?.toISOString().toString(),
          gender,
          address: {
            city_id: Number(city_id),
            state_id: Number(state_id),
            country_id: Number(country_id),
            postal_code,
            street_line_one,
          },
        };
        const res = await handleRegister(body);
        if (res.error) {
          setSubmitting(false);
          messageAlert(
            "Error",
            (res?.payload && res?.payload[0]?.error) || "Something went wrong"
          );
          return;
        }
        setSubmitting(false);
        router.push("/(auth)/user/verify");
      }}
      validationSchema={signupSchema}
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
        <>
          <ScrollView className=" py-6 px-4 flex-1">
            <View
              className="flex-1 !mn-28 w-full "
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
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      columnGap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    <View className="w-[50%]">
                      <DateTime
                        label="Date of birth"
                        name="dob"
                        value={values.dob}
                        errors={errors.dob}
                        touched={touched.dob}
                        handleChange={setFieldValue}
                        handleBlur={handleBlur}
                        placeholder="00/00/0000"
                      />
                    </View>
                    <View className="w-[50%]">
                      <Select
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
                      />
                    </View>
                  </View>
                  <Select
                    label="Country"
                    name="country_id"
                    value={values.country_id}
                    errors={errors.country_id}
                    touched={touched.country_id}
                    handleChange={setFieldValue}
                    handleBlur={handleBlur}
                    placeholder="Country"
                    items={countries?.map((country) => ({
                      label: `${country.emoji} ${country.name}`,
                      value: country.value,
                    }))}
                    setValue={setCount}
                  />
                  <Select
                    label="State "
                    name="state_id"
                    value={values.state_id}
                    errors={errors.state_id}
                    touched={touched.state_id}
                    handleChange={setFieldValue}
                    handleBlur={handleBlur}
                    placeholder="State"
                    items={states.map((state) => ({
                      label: state.name,
                      value: state.value,
                    }))}
                    setValue={setStat}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      columnGap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    <View className="w-[50%]">
                      <Select
                        label="City"
                        name="city_id"
                        value={values.city_id}
                        errors={errors.city_id}
                        touched={touched.city_id}
                        handleChange={setFieldValue}
                        handleBlur={handleBlur}
                        placeholder="City"
                        items={cities?.map((city) => ({
                          label: city.name,
                          value: city.value,
                        }))}
                      />
                    </View>
                    <View className="w-[50%]">
                      <Input
                        label="Postal Code"
                        name="postal_code"
                        value={values.postal_code}
                        errors={errors.postal_code}
                        touched={touched.postal_code}
                        handleChange={setFieldValue}
                        handleBlur={handleBlur}
                        placeholder="Postal Code"
                        type="postalCode"
                      />
                    </View>
                  </View>

                  <Input
                    label="Address"
                    name="street_line_one"
                    value={values.street_line_one}
                    errors={errors.street_line_one}
                    touched={touched.street_line_one}
                    handleChange={setFieldValue}
                    handleBlur={handleBlur}
                    placeholder="Address"
                    type="fullStreetAddress"
                  />
                </View>
              </View>
              <CheckBox
                name="read"
                label={
                  <View className="w-full flex-row items-center ">
                    <Text style={[globalStyles.regular_text, { fontSize: 16 }]}>
                      I have read and accepted{" "}
                    </Text>
                    <Pressable onPress={() => ""}>
                      <Text
                        className="text-primaryOne "
                        style={[globalStyles.bold_text, { fontSize: 16 }]}
                      >
                        the terms & conditions
                      </Text>
                    </Pressable>
                  </View>
                }
                errors={errors.read}
                touched={touched.read}
                value={values.read}
                handleChange={setFieldValue}
                handleBlur={handleBlur}
              />
            </View>
          </ScrollView>
          <View className="absolute bottom-4 right-4 ">
            <IconButton
              loading={isSubmitting}
              SVG={
                <Svg width="28" height="28" color="#fff" viewBox="0 0 24 24">
                  <Path
                    fill="currentColor"
                    d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"
                  />
                </Svg>
              }
              action={handleSubmit}
              disabled={!isValid}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default ProfileInfo;
