import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import BasicInfo from "../../components/Auth/UserRegister/BasicInfo";
import useAppDispatch, { useAppSelector } from "../../hooks/useDispatch";
import Loader from "../../components/Common/Loader";
import { getCountries } from "../../redux/slices/app/country";
import { RegisterData } from "../../utils/interface";
import ProfileInfo from "../../components/Auth/UserRegister/ProfileInfo";
import { postSignUp } from "../../redux/slices/user/signup";

const CreateAccountUser = () => {
  const [page, setPage] = useState(0);
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    gender: "",
    dob: undefined,
    phone_code: "",
    phone_no: "",
    address: {
      country_id: "",
      state_id: "",
      city_id: "",
      postal_code: "",
      street_line_one: "",
    },
  });

  const { loading, data } = useAppSelector((state) => state.country);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const handleRegister = async (body: RegisterData) => {
    const data = await dispatch(postSignUp(body));

    return data;
  };

  const formDisplay = () => {
    if (page === 0) {
      return (
        <BasicInfo
          countries={data}
          setPage={setPage}
          data={registerData}
          setData={setRegisterData}
        />
      );
    }
    return (
      <ProfileInfo
        countries={data}
        setPage={setPage}
        data={registerData}
        setData={setRegisterData}
        handleRegister={handleRegister}
      />
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">{formDisplay()}</View>
    </ScrollView>
  );
};

export default CreateAccountUser;
