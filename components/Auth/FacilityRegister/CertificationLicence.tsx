import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../../../constants/styles";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import moment from "moment";
import {
  deleteFromFacilityCertifications,
  deleteFromFacilityLicences,
} from "../../../redux/slices/facility/facility_portfolio";
import AdderHeader from "../../Common/AdderHeader";
import IconButton from "../../Common/IconButton";
import { Path, Svg } from "react-native-svg";
import { ScrollView } from "react-native-gesture-handler";

const CertificationLicence = () => {
  const { certifications, licences } = useAppSelector(
    (state) => state.facilityPortfolio
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const getDate = (date: string) => {
    const year = moment(new Date(date)).format("MMM YYYY");
    return year;
  };
  return (
    <>
      <ScrollView className=" py-6 px-4 flex-1">
        <View className="py-7 flex-1 relative space-y-16">
          {/* Certification */}
          <View className="flex-1 space-y-3">
            <AdderHeader
              title="Certifications"
              action={() => router.push("/(auth)/facility/certification/")}
            />
            {certifications.map((certification, index) => (
              <View
                key={index}
                className="bg-primaryGray p-5 space-y-4 rounded-lg "
              >
                <View className="flex flex-row  justify-between items-center">
                  <Text style={[globalStyles.semibold_text, { fontSize: 16 }]}>
                    {certification.name}
                  </Text>

                  <View className="flex flex-row space-x-4 ">
                    <AntDesign
                      name="edit"
                      size={24}
                      color="black"
                      onPress={() =>
                        router.push(`/(auth)/facility/certification/${index}`)
                      }
                    />
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={24}
                      color="black"
                      onPress={() =>
                        dispatch(deleteFromFacilityCertifications({ index }))
                      }
                    />
                  </View>
                </View>
                <Text
                  style={[
                    globalStyles.regular_text,
                    {
                      fontSize: 14,
                    },
                  ]}
                >
                  {getDate(certification.date)}
                </Text>
              </View>
            ))}
          </View>

          {/* Licence */}
          <View className="flex-1 space-y-3">
            <AdderHeader
              title="Licences"
              action={() => router.push("/(auth)/facility/licence/")}
            />
            {licences.map((licence, index) => (
              <View
                key={index}
                className="bg-primaryGray p-5 space-y-4 rounded-lg "
              >
                <View className="flex flex-row  justify-between items-center">
                  <Text style={[globalStyles.semibold_text, { fontSize: 16 }]}>
                    {licence.name}
                  </Text>

                  <View className="flex flex-row space-x-4 ">
                    <AntDesign
                      name="edit"
                      size={24}
                      color="black"
                      onPress={() =>
                        router.push(`/(auth)/facility/licence/${index}`)
                      }
                    />
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={24}
                      color="black"
                      onPress={() =>
                        dispatch(deleteFromFacilityLicences({ index }))
                      }
                    />
                  </View>
                </View>
                <View className="flex flex-row items-center">
                  <Text
                    style={[
                      globalStyles.regular_text,
                      {
                        fontSize: 14,
                      },
                    ]}
                  >
                    {getDate(licence.from)} {"-"}{" "}
                  </Text>
                  <Text
                    style={[
                      globalStyles.regular_text,
                      {
                        fontSize: 14,
                      },
                    ]}
                  >
                    {getDate(licence.to)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-4 right-4">
        <IconButton
          SVG={
            <Svg width="28" height="28" color="#fff" viewBox="0 0 24 24">
              <Path
                fill="currentColor"
                d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"
              />
            </Svg>
          }
          action={() => router.push("/(auth)/facility/register_three")}
          disabled={!certifications.length || !licences.length}
        />
      </View>
    </>
  );
};

export default CertificationLicence;
