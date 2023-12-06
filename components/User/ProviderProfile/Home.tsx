import { View, Text } from "react-native";
import React from "react";
import {
  Certificate,
  Education,
  Experience,
  Languages,
  Licence,
  StatBox,
} from "./Components";
import { globalStyles } from "../../../constants/styles";
import IconBox from "../../Common/IconBox";
import { Iconify } from "react-native-iconify";
import ReviewCard from "../../Common/ReviewCard";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Practitioner } from "../../../utils/interface";

const Home: React.FC<{ data: Practitioner }> = ({
  data: {
    description,
    education,
    licence,
    experience,
    certification,
    languages,
  },
}) => {
  return (
    <View className="space-y-6">
      <View
        className="px-4"
        style={{
          rowGap: 12,
        }}
      >
        <View className="py-2 px-3 justify-between bg-primaryGray rounded-lg flex-row  ">
          <StatBox title="Patient" value="120" />
          <StatBox title="Experience" value="4 yrs" />
          <StatBox title="Certification" value="9" />
        </View>
        <View className="p-3 bg-primaryGray space-y-1 rounded-lg ">
          <View className="bg-white p-2 space-y-1 rounded-lg">
            <Text
              className="text-mainBlack/80"
              style={[globalStyles.semibold_text, globalStyles.normal_text]}
            >
              About
            </Text>
            <Text
              className="text-[13px] text-mainBlack "
              style={[globalStyles.regular_text]}
            >
              {description}
            </Text>
          </View>
        </View>
        {education && <Education education={education} />}
        {experience && <Experience experience={experience} />}
        {certification && <Certificate certification={certification} />}
        {licence && <Licence licence={licence} />}
        {languages.length > 0 && <Languages languages={languages} />}
      </View>
      <ScrollView>
        <View
          style={{
            rowGap: 18,
          }}
        >
          <View className="flex-row px-4 justify-between items-center">
            <View
              className="flex-row items-center "
              style={{
                columnGap: 7,
              }}
            >
              <Text
                className="text-mainBlack"
                style={[globalStyles.semibold_text, globalStyles.normal_text]}
              >
                Reviews
              </Text>
              <IconBox
                icon={
                  <Iconify
                    icon="line-md:star-alt-filled"
                    size={18}
                    color="#F5AF44"
                  />
                }
                text="4.5 (123)"
              />
            </View>
            <Text
              className="text-secondaryTwo text-sm"
              style={[globalStyles.semibold_text]}
            >
              See more
            </Text>
          </View>
          <FlatList
            data={["1", "2", "3"]}
            renderItem={({ item, index }) => <ReviewCard key={index} />}
            horizontal
            contentContainerStyle={{
              columnGap: 12,
              paddingHorizontal: 16,
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
