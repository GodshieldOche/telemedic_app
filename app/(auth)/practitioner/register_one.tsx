import { View } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import { useRouter } from "expo-router";
import { getCountries } from "../../../redux/slices/app/country";
import Loader from "../../../components/Common/Loader";
import { getPracticesOnPractitionerCategory } from "../../../redux/slices/app/practitioner_category";
import PersonalInfo from "../../../components/Auth/PractitionerRegister/PersonalInfo";

const CreateAccountPractitioner = () => {
  const { data: countries } = useAppSelector((state) => state.country);
  const { practitioner_category_id } = useAppSelector(
    (state) => state.practitionerRegister.data
  );
  const { practices, loading } = useAppSelector(
    (state) => state.practitionerCategory
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!practitioner_category_id) {
      router.push("/(auth)/providers_options");
    }

    dispatch(getPracticesOnPractitionerCategory(practitioner_category_id));
    dispatch(getCountries());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <PersonalInfo practices={practices} countries={countries} />
      </View>
    </ScrollView>
  );
};

export default CreateAccountPractitioner;
