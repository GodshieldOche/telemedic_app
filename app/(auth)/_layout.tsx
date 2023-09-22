import React, { useEffect, useState } from "react";
import { Redirect, Stack } from "expo-router";
import { getSecureValueFor } from "../../utils/helper";
import Loader from "../../components/Common/Loader";

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    getSecureValueFor("userToken").then((token) => {
      setToken(token);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (token) {
    return <Redirect href="/(user)/" />;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="register_user"
        options={{
          title: "Create Account",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Nunito_Semibold",
            fontSize: 20,
            fontWeight: "600",
            color: "#2B2B2B",
          },
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
