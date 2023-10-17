import { View } from "react-native";
import React from "react";
import { useAppSelector } from "../../../hooks/useDispatch";
import Loader from "../../../components/Common/Loader";
import PractitionerPortfolio from "../../../components/Auth/PractitionerRegister/Portfolio";

const CreateAccountFacility = () => {
  const { loading } = useAppSelector((state) => state.facilityCategory);

  if (loading) {
    return <Loader />;
  }

  return (
    <View className="bg-white relative  flex-1">
      <PractitionerPortfolio />
    </View>
  );
};

export default CreateAccountFacility;
