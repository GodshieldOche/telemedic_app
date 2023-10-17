import { View } from "react-native";
import React, { useEffect } from "react";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import Loader from "../../../components/Common/Loader";
import { getCountries } from "../../../redux/slices/app/country";
import { RegisterData } from "../../../utils/interface";
import ProfileInfo from "../../../components/Auth/UserRegister/ProfileInfo";
import { postSignUp } from "../../../redux/slices/user/signup";

const CreateAccountUser = () => {
  const { loading, data } = useAppSelector((state) => state.country);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data) {
      dispatch(getCountries());
    }
  }, [data]);

  const handleRegister = async (body: RegisterData) => {
    const data = await dispatch(postSignUp(body));
    return data;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View className="bg-white relative  flex-1">
      <ProfileInfo countries={data} handleRegister={handleRegister} />
    </View>
  );
};

export default CreateAccountUser;
