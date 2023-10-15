import React, { useEffect } from "react";
import { Stack } from "expo-router";
import useAppDispatch from "../../../hooks/useDispatch";
import { options } from "../../../constants/styles";
import { resetPractitionerRegisterData } from "../../../redux/slices/practitioner/practitioner_signup";
import { resetPractitionerPorfolioState } from "../../../redux/slices/practitioner/practitioner_portfolio";

const PractitionerAuthLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetPractitionerRegisterData());
      dispatch(resetPractitionerPorfolioState());
    };
  }, []);
  return (
    <Stack>
      <Stack.Screen
        name="register_one"
        options={{
          ...options,
          title: "Personal Info",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="register_two"
        options={{
          ...options,
          title: "Portfolio",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="register_three"
        options={{
          ...options,
          title: "KYC Verification",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="selfie"
        options={{
          ...options,
          title: "Take a Selfie",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="options"
        options={{
          ...options,
          title: "Upload Document",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="nin"
        options={{
          ...options,
          title: "NIN",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="international_passport"
        options={{
          ...options,
          title: "International Passport",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="driving_licence"
        options={{
          ...options,
          title: "Driving Licence",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen name="certification" options={{ headerShown: false }} />
      <Stack.Screen name="licence" options={{ headerShown: false }} />
      <Stack.Screen name="education" options={{ headerShown: false }} />
      <Stack.Screen name="experience" options={{ headerShown: false }} />
      {/* <Stack.Screen
        name="verify"
        options={{
          ...options,
          title: "Verification",
          headerBackVisible: true,
        }}
      /> */}
      {/* <Stack.Screen name="success" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default PractitionerAuthLayout;
