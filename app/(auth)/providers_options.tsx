import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../constants/styles";
import IconTextBox from "../../components/Common/IconTextBox";
import useAppDispatch, { useAppSelector } from "../../hooks/useDispatch";
import { getFacilityCategories } from "../../redux/slices/app/facility_category";
import { getPractitionerCategories } from "../../redux/slices/app/practitioner_category";
import Loader from "../../components/Common/Loader";
import { setFacilityRegisterData } from "../../redux/slices/facility/facility_signup";
import { useRouter } from "expo-router";
import { setPractitionerRegisterData } from "../../redux/slices/practitioner/practitioner_signup";

const ProvidersOptions = () => {
  const { loading: fc_loading, list: facility_categories } = useAppSelector(
    (state) => state.facilityCategory
  );
  const { loading, list } = useAppSelector(
    (state) => state.practitionerCategory
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getFacilityCategories());
    dispatch(getPractitionerCategories());
  }, []);

  if (loading || fc_loading) {
    return <Loader />;
  }

  const handleFacilityDirect = (id: string) => {
    dispatch(
      setFacilityRegisterData({
        data: {
          facility_category_id: id,
        },
      })
    );

    router.push("/(auth)/facility/register_one");
  };

  const handlePractitionerDirect = (id: string) => {
    dispatch(
      setPractitionerRegisterData({
        data: {
          practitioner_category_id: id,
        },
      })
    );

    router.push("/(auth)/practitioner/register_two");
  };

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-7 px-4 space-y-8">
        {/* Practitioners */}
        <View className="flex-1 h-full w-full bg-primaryGray px-4 py-5 rounded-lg space-y-5">
          <Text style={[globalStyles.semibold_text, { fontSize: 18 }]}>
            Healthcare Practitioners
          </Text>

          <View
            style={{
              flexDirection: "column",
              rowGap: 16,
            }}
          >
            {list.map((category) => (
              <IconTextBox
                key={category.id}
                title={category.name}
                action={() => handlePractitionerDirect(category.id)}
              />
            ))}
          </View>
        </View>

        {/* Facilities */}
        <View className="flex-1 h-full w-full bg-primaryGray px-4 py-5 rounded-lg space-y-5">
          <Text style={[globalStyles.semibold_text, { fontSize: 18 }]}>
            Healthcare Facilities
          </Text>

          <View
            style={{
              flexDirection: "column",
              rowGap: 16,
            }}
          >
            {facility_categories.map((category) => (
              <IconTextBox
                key={category.id}
                title={category.name}
                action={() => handleFacilityDirect(category.id)}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProvidersOptions;
