import { View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useAppSelector } from "../../../hooks/useDispatch";
import Loader from "../../../components/Common/Loader";
import PractitionerPortfolio from "../../../components/Auth/PractitionerRegister/Portfolio";

const CreateAccountFacility = () => {
  const { loading } = useAppSelector((state) => state.facilityCategory);

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <PractitionerPortfolio />
      </View>
    </ScrollView>
  );
};

export default CreateAccountFacility;
