import { Alert } from "react-native";

export const messageAlert = (title: string = "Error", message: string) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: "Ok",
      },
    ],
    {
      cancelable: true,
    }
  );
};
