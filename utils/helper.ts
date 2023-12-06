import * as SecureStore from "expo-secure-store";
import moment from "moment";
import * as Clipboard from "expo-clipboard";

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

export const getMonthYear = (date: string) => {
  const year = moment(new Date(date)).format("MMM YYYY");
  return year;
};

export const copyToClipboard = async (text: string) => {
  await Clipboard.setStringAsync(text);
};
