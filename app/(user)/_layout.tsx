import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { deleteSecure, getSecureValueFor } from "../../utils/helper";
import Loader from "../../components/Common/Loader";
import useAppDispatch, { useAppSelector } from "../../hooks/useDispatch";
import { getCurrentUserProfile } from "../../redux/slices/user/profile";
import { options } from "../../constants/styles";
import axios from "axios";
import { router } from "expo-router";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const url = error.config.url as string;

    if (url.includes("user/profile")) {
      if (error?.response?.status === 401 || error?.response?.status === 404) {
        await deleteSecure("userToken");
        router.push("/(auth)/");
      }
    }

    return Promise.reject(error);
  }
);

export default function TabLayout() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, loading } = useAppSelector((state) => state.userProfile);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const token = await getSecureValueFor("userToken");
      await dispatch(getCurrentUserProfile(token));
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

      {/* Practitioners */}
      <Stack.Screen
        name="practitioners/index"
        options={{ ...options, title: "Practitioners" }}
      />
      <Stack.Screen
        name="practitioners/[id]"
        options={{ ...options, title: "Practitioner" }}
      />
      <Stack.Screen
        name="practitioners/more"
        options={{
          presentation: "modal",
          headerShown: true,
          ...options,
          title: "More",
        }}
      />
      <Stack.Screen
        name="practitioners/category/[id]"
        options={{
          headerShown: true,
          ...options,
          title: id?.split("+")[0] || "Practitioner",
        }}
      />

      {/* Facilioties */}
      <Stack.Screen
        name="facilities/index"
        options={{ ...options, title: "Facilities" }}
      />
      <Stack.Screen
        name="facilities/more"
        options={{
          presentation: "modal",
          headerShown: true,
          ...options,
          title: "More",
        }}
      />
      <Stack.Screen
        name="facilities/category/[id]"
        options={{
          headerShown: true,
          ...options,
          title: id?.split("+")[0] || "Facility",
        }}
      />

      {/* Wallet */}
      <Stack.Screen
        name="wallet/accounts"
        options={{
          ...options,
          title: "Virtual Accounts",
        }}
      />
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

      {/* settings */}
      <Stack.Screen
        name="settings/medical_information/index"
        options={{
          ...options,
          headerShown: true,
          title: "Medical Information",
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
      <Stack.Screen
        name="settings/notification/index"
        options={{
          ...options,
          headerShown: true,
          title: "Notification",
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

      {/* medical history */}
      <Stack.Screen
        name="settings/medical_information/history/index"
        options={{
          ...options,
          headerShown: true,
          title: "Medical History",
        }}
      />
      <Stack.Screen
        name="settings/medical_information/history/new"
        options={{
          ...options,
          headerShown: true,
          title: "Add Medical History",
        }}
      />
      <Stack.Screen
        name="settings/medical_information/history/[id]"
        options={{
          ...options,
          headerShown: true,
          title: "Edit Medical History",
        }}
      />
      {/*  Allergies */}
      <Stack.Screen
        name="settings/medical_information/allergies/index"
        options={{
          ...options,
          headerShown: true,
          title: "Allergies",
        }}
      />
      <Stack.Screen
        name="settings/medical_information/allergies/new"
        options={{
          ...options,
          headerShown: true,
          title: "Add Allergy",
        }}
      />
      <Stack.Screen
        name="settings/medical_information/allergies/[id]"
        options={{
          ...options,
          headerShown: true,
          title: "Edit Allergy",
        }}
      />
      {/*  Health Insurance */}
      <Stack.Screen
        name="settings/medical_information/insurances/index"
        options={{
          ...options,
          headerShown: true,
          title: "Heatlh Insurances",
        }}
      />
      <Stack.Screen
        name="settings/medical_information/insurances/new"
        options={{
          ...options,
          headerShown: true,
          title: "Add Heatlh Insurance",
        }}
      />
      <Stack.Screen
        name="settings/medical_information/insurances/[id]"
        options={{
          ...options,
          headerShown: true,
          title: "Edit Heatlh Insurance",
        }}
      />
      {/*  Test Results */}
      <Stack.Screen
        name="settings/medical_information/test_results/index"
        options={{
          ...options,
          headerShown: true,
          title: "Test Results",
        }}
      />
      <Stack.Screen
        name="settings/medical_information/test_results/new"
        options={{
          ...options,
          headerShown: true,
          title: "Add Test Result",
        }}
      />
      <Stack.Screen
        name="settings/medical_information/test_results/[id]"
        options={{
          ...options,
          headerShown: true,
          title: "Edit Test Result",
        }}
      />

      {/*  Prescriptions */}
      <Stack.Screen
        name="settings/medical_information/prescriptions/index"
        options={{
          ...options,
          headerShown: true,
          title: "Prescriptions",
        }}
      />
      <Stack.Screen
        name="settings/medical_information/prescriptions/new"
        options={{
          ...options,
          headerShown: true,
          title: "Add Prescription",
        }}
      />
      <Stack.Screen
        name="settings/medical_information/prescriptions/[id]/index"
        options={{
          headerShown: true,
          ...options,
          title: id?.split("+")[0] || "Prescription",
        }}
      />
      <Stack.Screen
        name="settings/medical_information/prescriptions/[id]/details"
        options={{
          headerShown: true,
          ...options,
          title: id?.split("+")[0] || "Prescription",
        }}
      />
      <Stack.Screen
        name="settings/medical_information/prescriptions/[id]/edit"
        options={{
          headerShown: true,
          ...options,
          title: "Edit Prescription",
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
      {/* shipping information */}
      <Stack.Screen
        name="settings/shipping_information/index"
        options={{
          ...options,
          headerShown: true,
          title: "Shipping Information",
        }}
      />
      <Stack.Screen
        name="settings/shipping_information/new"
        options={{
          ...options,
          headerShown: true,
          title: "Add Shipping Information",
        }}
      />
      <Stack.Screen
        name="settings/shipping_information/[id]"
        options={{
          ...options,
          headerShown: true,
          title: "Edit Shipping Information",
        }}
      />

      {/* Family and Friends */}
      <Stack.Screen
        name="settings/relationships/index"
        options={{
          ...options,
          headerShown: true,
          title: "Family & Friends",
        }}
      />
      <Stack.Screen
        name="settings/relationships/new"
        options={{
          ...options,
          headerShown: true,
          title: "Add New Family & Friends",
        }}
      />
      <Stack.Screen
        name="settings/relationships/requests"
        options={{
          ...options,
          headerShown: true,
          title: "Family & Friends Requests",
        }}
      />
      <Stack.Screen
        name="settings/relationships/[id]/index"
        options={{
          ...options,
          headerShown: true,
          title: "Family & Friends Details",
        }}
      />
    </Stack>
  );
}
