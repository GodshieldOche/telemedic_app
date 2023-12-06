import { Stack, useLocalSearchParams } from "expo-router";
import { options } from "../../../constants/styles";

export default function PractitionersLayout() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ ...options, title: "Facilities" }}
      />
      <Stack.Screen
        name="more"
        options={{
          presentation: "modal",
          headerShown: true,
          ...options,
          title: "More",
        }}
      />
      <Stack.Screen
        name="category/[id]"
        options={{
          headerShown: true,
          ...options,
          title: id?.split("+")[0] || "Facility",
        }}
      />
    </Stack>
  );
}
