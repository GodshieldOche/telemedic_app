import { Redirect, Stack } from "expo-router";
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
    if (error.response?.status === 401) {
      await deleteSecure("userToken");
      router.push("/(auth)/");
    }
    return Promise.reject(error);
  }
);

export default function TabLayout() {
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
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="practitioners"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="facilities"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="wallet/accounts"
        options={{
          ...options,
          title: "Virtual Accounts",
        }}
      />
    </Stack>
  );
}
