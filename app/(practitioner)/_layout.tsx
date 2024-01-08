import React, { useEffect } from "react";
import { Stack, router } from "expo-router";
import { options } from "../../constants/styles";
import axios from "axios";
import { deleteSecure, getSecureValueFor } from "../../utils/helper";
import useAppDispatch, { useAppSelector } from "../../hooks/useDispatch";
import { getCurrentPractitionerProfile } from "../../redux/slices/practitioner/profile";
import Loader from "../../components/Common/Loader";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const url = error.config.url as string;

    if (url.includes("practitioner/profile")) {
      if (error?.response?.status === 401 || error?.response?.status === 404) {
        await deleteSecure("practitionerToken");
        router.push("/(auth)/");
      }
    }

    return Promise.reject(error);
  }
);

const PractitionerLayout = () => {
  const { data, loading } = useAppSelector(
    (state) => state.practitionerProfile
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const token = await getSecureValueFor("practitionerToken");
      await dispatch(getCurrentPractitionerProfile(token));
    })();
  }, []);

  if (loading || !data) {
    return <Loader />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      {/* Wallet */}
      <Stack.Screen
        name="wallet/transactions/index"
        options={{
          ...options,
          title: "Transactions",
        }}
      />
      <Stack.Screen
        name="wallet/transactions/[id]"
        options={{
          ...options,
          title: "Receipt",
        }}
      />

      {/* Settings */}
      <Stack.Screen
        name="settings/notification/index"
        options={{
          ...options,
          headerShown: true,
          title: "Notification",
        }}
      />

      <Stack.Screen
        name="settings/account/index"
        options={{
          ...options,
          headerShown: true,
          title: "Password/ Account Settings",
        }}
      />
      <Stack.Screen
        name="settings/account/change_password"
        options={{ ...options, headerShown: true, title: "Change Password" }}
      />
      <Stack.Screen
        name="settings/account/delete_account"
        options={{
          ...options,
          headerShown: true,
          title: "Deactivate/Delete Account",
        }}
      />

      {/*  Personal Information */}
      <Stack.Screen
        name="settings/personal_information/index"
        options={{
          ...options,
          headerShown: true,
          title: "Personal Information",
        }}
      />
      <Stack.Screen
        name="settings/personal_information/edit"
        options={{
          ...options,
          headerShown: true,
          title: "Edit Personal Information",
        }}
      />
      <Stack.Screen
        name="settings/help/index"
        options={{
          ...options,
          headerShown: true,
          title: "Help & Support",
        }}
      />
      <Stack.Screen
        name="settings/legal/index"
        options={{
          ...options,
          headerShown: true,
          title: "Legal",
        }}
      />
    </Stack>
  );
};

export default PractitionerLayout;
