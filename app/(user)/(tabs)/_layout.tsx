import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { Iconify } from "react-native-iconify";
import { globalStyles } from "../../../constants/styles";
import { options } from "../../../constants/styles";
import { useAppSelector } from "../../../hooks/useDispatch";
import ImageSvg from "../../../components/Common/ImageSvg";

export default function TabLayout() {
  const data = useAppSelector((state) => state.userProfile).data!;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2B2B2B",
        tabBarItemStyle: {
          rowGap: -2,
          paddingBottom: Platform.OS === "ios" ? 0 : 10,
        },
        tabBarStyle: {
          height: Platform.OS === "ios" ? 88 : 62,
        },
        tabBarLabelStyle: [globalStyles.semibold_text, { fontSize: 12 }],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <>
              {focused ? (
                <Iconify icon="material-symbols:home" size={24} color={color} />
              ) : (
                <Iconify
                  icon="material-symbols:home-outline"
                  size={24}
                  color={color}
                />
              )}
            </>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, focused }) => (
            <>
              {focused ? (
                <Iconify
                  icon="icon-park-solid:schedule"
                  size={24}
                  color={color}
                />
              ) : (
                <Iconify
                  icon="icon-park-outline:schedule"
                  size={24}
                  color={color}
                />
              )}
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: "Message",
          tabBarIcon: ({ color, focused }) => (
            <>
              {focused ? (
                <Iconify
                  icon="fluent:chat-multiple-24-filled"
                  size={24}
                  color={color}
                />
              ) : (
                <Iconify
                  icon="fluent:chat-multiple-24-regular"
                  size={24}
                  color={color}
                />
              )}
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <>
              {focused ? (
                <Iconify icon="ph:wallet-fill" size={24} color={color} />
              ) : (
                <Iconify icon="ph:wallet" size={24} color={color} />
              )}
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          ...options,
          title: "You",
          headerShown: false,
          tabBarIcon: () => (
            <ImageSvg
              url={data.display_photo}
              style={{ width: 24, height: 24 }}
              blurhash={data.blur_hash}
            />
          ),
        }}
      />
    </Tabs>
  );
}
