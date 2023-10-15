import { View } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import BasicInfo from "../../../components/Auth/UserRegister/BasicInfo";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import Loader from "../../../components/Common/Loader";
import { getCountries } from "../../../redux/slices/app/country";

const CreateAccountUser = () => {
  const { loading, data } = useAppSelector((state) => state.country);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <BasicInfo countries={data} />
      </View>
    </ScrollView>
  );
};

export default CreateAccountUser;
