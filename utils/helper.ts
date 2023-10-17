import * as SecureStore from "expo-secure-store";

export const saveSecure = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};
export const getSecureValueFor = async (key: string) => {
  const result = await SecureStore.getItemAsync(key);
  return result;
};
export const deleteSecure = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

export const getYears = (e?: number) => {
  const start = 1910;
  const end = e ? e : new Date().getFullYear();
  return Array.from({ length: end - start + 1 }, (_, index) => index + start);
};
