import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { Iconify } from "react-native-iconify";
import { globalStyles } from "../../../constants/styles";

export default function TabLayout() {
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
        name="five"
        options={{
          tabBarButton: () => (
            <View className="flex-1 justify-center items-center ">
              <View className="w-9 rounded-full flex justify-center items-center h-9 bg-primaryOne ">
                <Iconify icon="ic:round-add" size={24} color="white" />
              </View>
            </View>
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
                <Iconify icon="ic:baseline-message" size={24} color={color} />
              ) : (
                <Iconify icon="ic:outline-message" size={24} color={color} />
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
    </Tabs>
  );
}
