import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import Loader from "../../../components/Common/Loader";
import {
  postResendOTP,
  postVerfifyAccount,
} from "../../../redux/slices/user/signup";
import { messageAlert } from "../../../components/Common/Alerts";
import EmailVerification from "../../../components/Auth/EmailVerification";

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
      router.replace("/(auth)/user/register_one");
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
    router.push("/(auth)/user/success");
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
    <EmailVerification
      email={email}
      value={value}
      setValue={setValue}
      handleVerify={handleVerify}
      handleResendOTP={handleResendOTP}
      loading={loading}
      resending={resending}
    />
  );
};

export default VerifyUserAccount;
