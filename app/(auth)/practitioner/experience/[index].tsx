import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useLocalSearchParams, useRouter } from "expo-router";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import { Experience } from "../../../../utils/interface";
import { editPractitionerExperiences } from "../../../../redux/slices/practitioner/practitioner_portfolio";
import { getCountries } from "../../../../redux/slices/app/country";
import Loader from "../../../../components/Common/Loader";
import ExperienceForm from "../../../../components/PortfolioForm/ExperienceForm";

const EditExperience = () => {
  const { index } = useLocalSearchParams<{ index: string }>();
  const { experiences } = useAppSelector(
    (state) => state.practitionerPortfolio
  );
  const [data, _] = useState<Experience>(experiences[Number(index)]);

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
      editPractitionerExperiences({
        data: {
          ...values,
          from: values?.from?.toISOString()?.toString(),
          to: values?.to?.toISOString()?.toString(),
        },
        index: Number(index),
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

export default EditExperience;
