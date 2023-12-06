import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../../../constants/styles";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import AdderHeader from "../../Common/AdderHeader";
import IconButton from "../../Common/IconButton";
import { Path, Svg } from "react-native-svg";
import {
  deleteFromPractitionerCertifications,
  deleteFromPractitionerEducations,
  deleteFromPractitionerExperiences,
  deleteFromPractitionerLicences,
} from "../../../redux/slices/practitioner/practitioner_portfolio";
import { ScrollView } from "react-native-gesture-handler";
import { getMonthYear } from "../../../utils/helper";

const PractitionerPortfolio = () => {
  const { certifications, licences, educations, experiences } = useAppSelector(
    (state) => state.practitionerPortfolio
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <>
      <ScrollView className=" py-6 px-4 flex-1">
        <View className="py-7 flex-1 !mb-28 relative space-y-12">
          {/* Certification */}
          <View className="flex-1 space-y-3">
            <AdderHeader
              title="Certifications"
              action={() => router.push("/(auth)/practitioner/certification/")}
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
                      size={20}
                      color="black"
                      onPress={() =>
                        router.push(
                          `/(auth)/practitioner/certification/${index}`
                        )
                      }
                    />
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={20}
                      color="black"
                      onPress={() =>
                        dispatch(
                          deleteFromPractitionerCertifications({ index })
                        )
                      }
                    />
                  </View>
                </View>
                <Text
                  style={[
                    globalStyles.regular_text,
                    {
                      fontSize: 13,
                    },
                  ]}
                >
                  {getMonthYear(certification.date)}
                </Text>
              </View>
            ))}
          </View>

          {/* Licence */}
          <View className="flex-1 space-y-3">
            <AdderHeader
              title="Licences"
              action={() => router.push("/(auth)/practitioner/licence/")}
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
                      size={20}
                      color="black"
                      onPress={() =>
                        router.push(`/(auth)/practitioner/licence/${index}`)
                      }
                    />
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={20}
                      color="black"
                      onPress={() =>
                        dispatch(deleteFromPractitionerLicences({ index }))
                      }
                    />
                  </View>
                </View>
                <View className="flex flex-row items-center">
                  <Text
                    style={[
                      globalStyles.regular_text,
                      {
                        fontSize: 13,
                      },
                    ]}
                  >
                    {getMonthYear(licence.from)} {"-"}{" "}
                  </Text>
                  <Text
                    style={[
                      globalStyles.regular_text,
                      {
                        fontSize: 13,
                      },
                    ]}
                  >
                    {getMonthYear(licence.to)}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Education */}
          <View className="flex-1 space-y-3">
            <AdderHeader
              title="Educations"
              action={() => router.push("/(auth)/practitioner/education/")}
            />
            {educations.map((education, index) => (
              <View
                key={index}
                className="bg-primaryGray p-5 space-y-4 rounded-lg "
              >
                <View className="flex flex-row  justify-between items-start">
                  <View className="space-y-2">
                    <Text
                      style={[globalStyles.semibold_text, { fontSize: 16 }]}
                    >
                      {education.field_of_study}
                    </Text>
                    <Text
                      style={[
                        globalStyles.semibold_text,
                        { fontSize: 13, color: "#606060" },
                      ]}
                    >
                      {education.institution}
                    </Text>
                  </View>

                  <View className="flex flex-row space-x-4 ">
                    <AntDesign
                      name="edit"
                      size={20}
                      color="black"
                      onPress={() =>
                        router.push(`/(auth)/practitioner/education/${index}`)
                      }
                    />
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={20}
                      color="black"
                      onPress={() =>
                        dispatch(deleteFromPractitionerEducations({ index }))
                      }
                    />
                  </View>
                </View>
                <View className="flex flex-row items-center">
                  <Text
                    style={[
                      globalStyles.regular_text,
                      {
                        fontSize: 13,
                      },
                    ]}
                  >
                    {getMonthYear(education.from)} {"-"}{" "}
                  </Text>
                  <Text
                    style={[
                      globalStyles.regular_text,
                      {
                        fontSize: 13,
                      },
                    ]}
                  >
                    {education.present ? "Present" : getMonthYear(education.to)}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Experinces */}
          <View className="flex-1 space-y-3">
            <AdderHeader
              title="Experiences"
              action={() => router.push("/(auth)/practitioner/experience/")}
            />
            {experiences.map((experience, index) => (
              <View
                key={index}
                className="bg-primaryGray p-5 space-y-4 rounded-lg "
              >
                <View className="flex flex-row  justify-between items-start">
                  <View className="space-y-2">
                    <Text
                      style={[globalStyles.semibold_text, { fontSize: 16 }]}
                    >
                      {experience.title}
                    </Text>
                    <Text
                      style={[
                        globalStyles.semibold_text,
                        { fontSize: 13, color: "#606060" },
                      ]}
                    >
                      {experience.organisation}
                    </Text>
                  </View>

                  <View className="flex flex-row space-x-4 ">
                    <AntDesign
                      name="edit"
                      size={20}
                      color="black"
                      onPress={() =>
                        router.push(`/(auth)/practitioner/experience/${index}`)
                      }
                    />
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={20}
                      color="black"
                      onPress={() =>
                        dispatch(deleteFromPractitionerExperiences({ index }))
                      }
                    />
                  </View>
                </View>
                <View className="space-y-4">
                  <View className="flex flex-row items-center">
                    <Text
                      style={[
                        globalStyles.regular_text,
                        {
                          fontSize: 13,
                        },
                      ]}
                    >
                      {getMonthYear(experience.from)} {"-"}{" "}
                    </Text>
                    <Text
                      style={[
                        globalStyles.regular_text,
                        {
                          fontSize: 13,
                        },
                      ]}
                    >
                      {experience.present
                        ? "Present"
                        : getMonthYear(experience.to)}
                    </Text>
                  </View>
                  <Text
                    style={[
                      globalStyles.semibold_text,
                      { fontSize: 13, color: "#606060" },
                    ]}
                  >
                    {experience.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-4 right-4 ">
        <IconButton
          SVG={
            <Svg width="28" height="28" color="#fff" viewBox="0 0 24 24">
              <Path
                fill="currentColor"
                d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"
              />
            </Svg>
          }
          action={() => router.push("/(auth)/practitioner/register_three")}
          disabled={
            !certifications.length ||
            !licences.length ||
            !experiences.length ||
            !educations.length
          }
        />
      </View>
    </>
  );
};

export default PractitionerPortfolio;
