import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import Loader from "../../../components/Common/Loader";
import { messageAlert } from "../../../components/Common/Alerts";
import EmailVerification from "../../../components/Auth/EmailVerification";
import {
  postPractitionerResendOTP,
  postPractitionerVerfifyAccount,
} from "../../../redux/slices/practitioner/practitioner_signup";

const VerifyPractitionerAccount = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const { email, loading, resending } = useAppSelector(
    (state) => state.practitionerRegister
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!email) {
      router.replace("/(auth)/practitioner/register_one");
    }
    setLoading(false);
  }, [email]);

  if (isLoading) {
    return <Loader />;
  }

  const handleVerify = async () => {
    const res = await dispatch(
      postPractitionerVerfifyAccount({ email, otp: value })
    );
    if (res.error) {
      messageAlert(
        "Error",
        (res?.payload && res?.payload[0]?.error) || "Something went wrong"
      );
      return;
    }
    router.push("/(auth)/practitioner/success");
  };

  const handleResendOTP = async () => {
    const res = await dispatch(postPractitionerResendOTP({ email }));
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

export default VerifyPractitionerAccount;
