import { View } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import HealthCareInfo from "../../../components/Auth/FacilityRegister/HealthCareInfo";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import { useRouter } from "expo-router";
import { getTypesOnFacilityCategory } from "../../../redux/slices/app/facility_category";
import { getCountries } from "../../../redux/slices/app/country";
import Loader from "../../../components/Common/Loader";

const CreateAccountFacility = () => {
  const { data: countries } = useAppSelector((state) => state.country);
  const { facility_category_id } = useAppSelector(
    (state) => state.facilityRegister.data
  );
  const { types, loading } = useAppSelector((state) => state.facilityCategory);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!facility_category_id) {
      router.push("/(auth)/providers_options");
    }

    dispatch(getTypesOnFacilityCategory(facility_category_id));
    dispatch(getCountries());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <View className="bg-white relative  flex-1">
      <HealthCareInfo types={types} countries={countries} />
    </View>
  );
};

export default CreateAccountFacility;
