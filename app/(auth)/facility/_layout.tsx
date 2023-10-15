import React, { useEffect } from "react";
import { Stack } from "expo-router";
import useAppDispatch from "../../../hooks/useDispatch";
import { options } from "../../../constants/styles";
import { resetFacilityRegisterData } from "../../../redux/slices/facility/facility_signup";
import { resetFacilityPorfolioState } from "../../../redux/slices/facility/facility_portfolio";

const FacilityAuthLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetFacilityRegisterData());
      dispatch(resetFacilityPorfolioState());
    };
  }, []);
  return (
    <Stack>
      <Stack.Screen
        name="register_one"
        options={{
          ...options,
          title: "Facility Info",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="register_two"
        options={{
          ...options,
          title: "Certification & Licence",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="register_three"
        options={{
          ...options,
          title: "Gallery",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen name="certification" options={{ headerShown: false }} />
      <Stack.Screen name="licence" options={{ headerShown: false }} />
      <Stack.Screen
        name="verify"
        options={{
          ...options,
          title: "Verification",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen name="success" options={{ headerShown: false }} />
    </Stack>
  );
};

export default FacilityAuthLayout;
