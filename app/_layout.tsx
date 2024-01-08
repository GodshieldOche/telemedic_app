import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Nunito_700Bold,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import * as Location from "expo-location";
import useAppDispatch from "../hooks/useDispatch";
import { setLocation } from "../redux/slices/app/location";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

declare global {
  interface String {
    toCapitalized(): string;
  }
}

String.prototype.toCapitalized = function () {
  const stringArr = [...this.toLowerCase()];
  stringArr[0] = stringArr[0].toUpperCase();

  return stringArr.join("");
};

export default function RootLayout() {
  StatusBar.setBarStyle("dark-content");
  let [loaded, error] = useFonts({
    Nunito_Bold: Nunito_700Bold,
    Nunito: Nunito_400Regular,
    Nunito_Meduim: Nunito_500Medium,
    Nunito_Semibold: Nunito_600SemiBold,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootLayoutNav />
      </SafeAreaProvider>
    </Provider>
  );
}

function RootLayoutNav() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();

      const geoCodedLocation = await Location.getCurrentPositionAsync({});

      const location = await Location.reverseGeocodeAsync(
        geoCodedLocation.coords
      );

      dispatch(setLocation({ location: location[0] }));
    })();
  }, []);

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="(practitioner)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </>
  );
}
