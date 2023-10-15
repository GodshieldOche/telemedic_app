import React from "react";
import { Stack } from "expo-router";
import { options } from "../../../../constants/styles";

const CertificationLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...options,
          title: "Add Education",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="[index]"
        options={{
          ...options,
          title: "Edit Education",
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
};

export default CertificationLayout;
