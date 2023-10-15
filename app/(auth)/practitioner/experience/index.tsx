import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Experience } from "../../../../utils/interface";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import { useRouter } from "expo-router";
import { addToPractitionerExperiences } from "../../../../redux/slices/practitioner/practitioner_portfolio";
import ExperienceForm from "../../../../components/PortfolioForm/ExperienceForm";
import Loader from "../../../../components/Common/Loader";
import { getCountries } from "../../../../redux/slices/app/country";

const AddExperience = () => {
  const [data, _] = useState<Experience>({
    title: "",
    organisation: "",
    description: "",
    from: undefined,
    to: undefined,
    country_id: "",
    present: false,
  });

  const { loading, data: countries } = useAppSelector((state) => state.country);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!countries.length) {
      dispatch(getCountries());
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleSubmit = (values: Experience) => {
    dispatch(
      addToPractitionerExperiences({
        data: {
          ...values,
          from: values?.from?.toISOString()?.toString(),
          to: values?.to?.toISOString()?.toString(),
        },
      })
    );
    router.back();
  };

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <ExperienceForm
          data={data}
          handleSubmit={handleSubmit}
          countries={countries}
        />
      </View>
    </ScrollView>
  );
};

export default AddExperience;
