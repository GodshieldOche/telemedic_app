import React, { useEffect, useState } from "react";
import { Redirect, Stack } from "expo-router";
import { getSecureValueFor } from "../../utils/helper";
import Loader from "../../components/Common/Loader";
import { options } from "../../constants/styles";

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [practitionerToken, setPractitionerToken] = useState<string | null>(
    null
  );

  useEffect(() => {
    getSecureValueFor("userToken").then((token) => {
      setToken(token);
    });
    getSecureValueFor("practitionerToken").then((token) => {
      setPractitionerToken(token);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (token) {
    return <Redirect href="/(user)/(tabs)/" />;
  }

  if (practitionerToken) {
    return <Redirect href="/(practitioner)/(tabs)/" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="user" options={{ headerShown: false }} />
      <Stack.Screen name="facility" options={{ headerShown: false }} />
      <Stack.Screen name="practitioner" options={{ headerShown: false }} />
      <Stack.Screen
        name="providers_options"
        options={{ ...options, title: "Healthcare Providers" }}
      />
      <Stack.Screen
        name="terms_and_condtions"
        options={{
          presentation: "modal",
          ...options,
          title: "Terms & Conditions",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
