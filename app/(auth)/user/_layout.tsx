import React, { useEffect } from "react";
import { Stack } from "expo-router";
import useAppDispatch from "../../../hooks/useDispatch";
import { resetRegisterData } from "../../../redux/slices/user/signup";
import { options } from "../../../constants/styles";

const UserAuthLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetRegisterData());
    };
  }, []);
  return (
    <Stack>
      <Stack.Screen
        name="register_one"
        options={{
          ...options,
          title: "Create Account",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="register_two"
        options={{
          ...options,
          title: "Create Account",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="verify"
        options={{
          ...options,
          title: "Create Account",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen name="success" options={{ headerShown: false }} />
    </Stack>
  );
};

export default UserAuthLayout;
