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

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(
      getPracticesOnPractitionerCategory({
        id: practitioner_category_id,
        signal,
      })
    );
    dispatch(getCountries());

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <View className="relative flex-1 bg-white">
      <PersonalInfo practices={practices} countries={countries} />
    </View>
  );
};

export default CreateAccountPractitioner;
