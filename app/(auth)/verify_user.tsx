import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { VerifcationSvg } from "../../components/Common/svgs";
import { globalStyles } from "../../constants/styles";
import CodeFieldComp from "../../components/Common/CodeField";
import Button from "../../components/Common/Button";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import useAppDispatch, { useAppSelector } from "../../hooks/useDispatch";
import Loader from "../../components/Common/Loader";
import {
  postResendOTP,
  postVerfifyAccount,
} from "../../redux/slices/user/signup";
import { messageAlert } from "../../components/Common/Alerts";

const VerifyUserAccount = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const { email, loading, resending } = useAppSelector(
    (state) => state.userRegister
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!email) {
      router.replace("/(auth)/register_user");
    }
    setLoading(false);
  }, [email]);

  if (isLoading) {
    return <Loader />;
  }

  const handleVerify = async () => {
    const res = await dispatch(postVerfifyAccount({ email, otp: value }));
    if (res.error) {
      messageAlert(
        "Error",
        (res?.payload && res?.payload[0]?.error) || "Something went wrong"
      );
      return;
    }
    router.push("/(auth)/success_user");
  };

  const handleResendOTP = async () => {
    const res = await dispatch(postResendOTP({ email }));
    if (res.error) {
      messageAlert(
        "Error",
        (res?.payload && res?.payload[0]?.error) || "Something went wrong"
      );
      return;
    }
    messageAlert("Success", "OTP resent successfully");
  };

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-12 px-4 space-y-14">
        <View className="flex flex-col space-y-6 items-center">
          <VerifcationSvg />
          <View className="w-full flex flex-col items-center space-y-2 max-w-[298px] ">
            <Text
              className="text-2xl text-center"
              style={[globalStyles.semibold_text]}
            >
              Email Verification
            </Text>
            <Text
              className="text-center text-base "
              style={[globalStyles.regular_text]}
            >
              Please type the verification code sent to {email}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            rowGap: 40,
          }}
        >
          <CodeFieldComp value={value} setValue={setValue} cell_count={6} />
          <Button
            text="Verify Account"
            action={handleVerify}
            loading={loading}
          />
          <View className="w-full flex-row items-center space-x-1 justify-center ">
            <Text style={[globalStyles.regular_text, { fontSize: 16 }]}>
              Didn't received email?{" "}
            </Text>
            <Pressable onPress={() => handleResendOTP()}>
              <Text
                className="text-primaryOne "
                style={[globalStyles.bold_text, { fontSize: 16 }]}
              >
                Resend
              </Text>
            </Pressable>
            {resending && <ActivityIndicator size="small" color="#8863F2" />}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default VerifyUserAccount;
