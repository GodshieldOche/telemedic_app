import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Education } from "../../../../utils/interface";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import { useRouter } from "expo-router";
import { addToPractitionerEducations } from "../../../../redux/slices/practitioner/practitioner_portfolio";
import EducationForm from "../../../../components/PortfolioForm/EducationForm";
import { getCountries } from "../../../../redux/slices/app/country";
import { getDegrees } from "../../../../redux/slices/app/degrees";
import Loader from "../../../../components/Common/Loader";

const AddEducation = () => {
  const [data, _] = useState<Education>({
    institution: "",
    degree_id: "",
    field_of_study: "",
    from: undefined,
    to: undefined,
    country_id: "",
    present: false,
  });

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
      addToPractitionerEducations({
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
        <EducationForm
          data={data}
          degrees={degrees}
          countries={countries}
          handleSubmit={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

export default AddEducation;
