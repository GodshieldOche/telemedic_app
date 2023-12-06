import { Stack } from "expo-router";
import { options } from "../../../constants/styles";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ ...options, title: "Settings" }} />
      <Stack.Screen
        name="medical_information/index"
        options={{
          ...options,
          headerShown: true,
          title: "Medical Information",
        }}
      />
      <Stack.Screen
        name="account/index"
        options={{
          ...options,
          headerShown: true,
          title: "Password/ Account Settings",
        }}
      />
      <Stack.Screen
        name="account/change_password"
        options={{ ...options, headerShown: true, title: "Change Password" }}
      />
      <Stack.Screen
        name="account/delete_account"
        options={{
          ...options,
          headerShown: true,
          title: "Deactivate/Delete Account",
        }}
      />
      <Stack.Screen
        name="notification/index"
        options={{
          ...options,
          headerShown: true,
          title: "Notification",
        }}
      />
      <Stack.Screen
        name="help/index"
        options={{
          ...options,
          headerShown: true,
          title: "Help & Support",
        }}
      />
      <Stack.Screen
        name="legal/index"
        options={{
          ...options,
          headerShown: true,
          title: "Legal",
        }}
      />

      {/* medical history */}
      <Stack.Screen
        name="medical_information/history/index"
        options={{
          ...options,
          headerShown: true,
          title: "Medical History",
        }}
      />
    </Stack>
  );
}
