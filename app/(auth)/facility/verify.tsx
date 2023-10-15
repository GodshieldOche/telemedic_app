import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import Loader from "../../../components/Common/Loader";
import { messageAlert } from "../../../components/Common/Alerts";
import EmailVerification from "../../../components/Auth/EmailVerification";
import {
  postFacilityResendOTP,
  postFacilityVerfifyAccount,
} from "../../../redux/slices/facility/facility_signup";

const VerifyFacilityAccount = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const { email, loading, resending } = useAppSelector(
    (state) => state.facilityRegister
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!email) {
      router.replace("/(auth)/facility/register_one");
    }
    setLoading(false);
  }, [email]);

  if (isLoading) {
    return <Loader />;
  }

  const handleVerify = async () => {
    const res = await dispatch(
      postFacilityVerfifyAccount({ email, otp: value })
    );
    if (res.error) {
      messageAlert(
        "Error",
        (res?.payload && res?.payload[0]?.error) || "Something went wrong"
      );
      return;
    }
    router.push("/(auth)/facility/success");
  };

  const handleResendOTP = async () => {
    const res = await dispatch(postFacilityResendOTP({ email }));
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

export default VerifyFacilityAccount;
