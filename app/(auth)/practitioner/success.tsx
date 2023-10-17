import { View, SafeAreaView } from "react-native";
import React from "react";
import RegSuccess from "../../../components/Common/RegSuccess";
import { useRouter } from "expo-router";

const success = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="bg-white  flex-1">
      <View className="flex-1 h-[100%] flex-col  justify-center items-center ">
        <RegSuccess
          title="Congratulations"
          description="Our team will review the information provided. Please check your email for update on your account status"
          action={() => router.replace("/(user)/")}
        />
      </View>
    </SafeAreaView>
  );
};

export default success;
