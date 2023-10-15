import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useLocalSearchParams, useRouter } from "expo-router";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import { Education } from "../../../../utils/interface";
import { editPractitionerEducations } from "../../../../redux/slices/practitioner/practitioner_portfolio";
import { getDegrees } from "../../../../redux/slices/app/degrees";
import { getCountries } from "../../../../redux/slices/app/country";
import Loader from "../../../../components/Common/Loader";
import EducationForm from "../../../../components/PortfolioForm/EducationForm";

const EditEducation = () => {
  const { index } = useLocalSearchParams<{ index: string }>();
  const { educations } = useAppSelector((state) => state.practitionerPortfolio);
  const [data, _] = useState<Education>(educations[Number(index)]);

  const { loading: cloading, data: countries } = useAppSelector(
    (state) => state.country
  );
  const { loading: dloading, data: degrees } = useAppSelector(
    (state) => state.degrees
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!degrees.length) {
      dispatch(getDegrees());
    }
    if (!countries.length) {
      dispatch(getCountries());
    }
  }, []);

  if (cloading || dloading) {
    return <Loader />;
  }

  const handleSubmit = (values: Education) => {
    dispatch(
      editPractitionerEducations({
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
        <EducationForm
          data={data}
          handleSubmit={handleSubmit}
          countries={countries}
          degrees={degrees}
        />
      </View>
    </ScrollView>
  );
};

export default EditEducation;
