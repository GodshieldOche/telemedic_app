import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Button from "../../components/Common/Button";
import { useRouter } from "expo-router";
import { deleteSecure } from "../../utils/helper";

export default function TabOneScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await deleteSecure("userToken");
    router.replace("/(auth)/");
  };
  return (
    <View style={styles.container}>
      <Text className="text-red-900" style={styles.title}>
        Tab One
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button text="Log Out" action={handleLogout} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
