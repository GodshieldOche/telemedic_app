import { View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useAppSelector } from "../../../hooks/useDispatch";
import Loader from "../../../components/Common/Loader";
import CertificationLicence from "../../../components/Auth/FacilityRegister/CertificationLicence";

const CreateAccountFacility = () => {
  const { loading } = useAppSelector((state) => state.facilityCategory);

  if (loading) {
    return <Loader />;
  }

  return (
    <View className="bg-white relative flex-1">
      <CertificationLicence />
    </View>
  );
};

export default CreateAccountFacility;
