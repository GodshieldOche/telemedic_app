import { Pressable, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import IconTextBox from "../Common/IconTextBox";

const SignUpOptions: React.FC<{ handleSignIn: () => void }> = ({
  handleSignIn,
}) => {
  const handleUserRegister = () => {
    router.push("/(auth)/user/register_one");
  };
  const handleProviderRegister = () => {
    router.push("/(auth)/providers_options");
  };

  const router = useRouter();

  return (
    <ScrollView className="">
      <View className=" p-6 items-center flex flex-col space-y-7">
        <Text
          className="text-xl text-mainBlack "
          style={globalStyles.semibold_text}
        >
          Create account as
        </Text>

        <View
          className="w-full py-5 px-4 rounded-lg bg-primaryGray"
          style={{
            flex: 1,
            flexDirection: "column",
            rowGap: 24,
          }}
        >
          <IconTextBox
            title="User of healthcare services"
            action={handleUserRegister}
          />
          <IconTextBox
            title="Provider of healthcare services"
            action={handleProviderRegister}
          />
        </View>

        <View className="w-full flex-row items-center justify-center ">
          <Text style={[globalStyles.regular_text, { fontSize: 16 }]}>
            Already have an account?{" "}
          </Text>
          <Pressable onPress={handleSignIn}>
            <Text
              className="text-primaryOne "
              style={[globalStyles.bold_text, { fontSize: 16 }]}
            >
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpOptions;
