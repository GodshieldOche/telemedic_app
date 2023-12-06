import { Text, View } from "react-native";
import { globalStyles } from "../../../constants/styles";
import { truncate } from "lodash";
import { getMonthYear } from "../../../utils/helper";
import { Language } from "../../../utils/interface";

export const StatBox: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <View className="bg-white py-3 space-y-1 items-center justify-center rounded-lg px-6 ">
      <Text
        className="text-[11px] text-mainGray "
        style={[globalStyles.regular_text]}
      >
        {title}
      </Text>
      <Text
        className="text-secondarySix"
        style={[globalStyles.big_text, globalStyles.semibold_text]}
      >
        {value}
      </Text>
    </View>
  );
};

export const Education: React.FC<{
  education: {
    degree: string;
    field_of_study: string;
    from: string;
    id: string;
    institution: string;
    present: boolean;
    to: string;
  };
}> = ({ education }) => {
  return (
    <View className="p-3 bg-primaryGray space-y-1 rounded-lg ">
      <View className="bg-white p-2 space-y-2 rounded-lg">
        <View className="space-y-1">
          <Text
            className="text-mainBlack/80"
            style={[globalStyles.semibold_text, globalStyles.normal_text]}
          >
            Education
          </Text>
          <Text
            className="text-mainBlack"
            style={[globalStyles.semibold_text, globalStyles.normal_text]}
          >
            {truncate(education.degree)}
          </Text>
          <Text
            className="text-[13px] text-mainBlack "
            style={[globalStyles.regular_text]}
          >
            {education.institution}
          </Text>
        </View>

        <Text
          className="text-[13px] text-secondarySix "
          style={[globalStyles.regular_text]}
        >
          {getMonthYear(education.from)} {"-"}{" "}
          {education.present ? "Present" : getMonthYear(education.to)}
        </Text>
      </View>
    </View>
  );
};

export const Experience: React.FC<{
  experience: {
    id: string;
    title: string;
    organisation: string;
    description: string;
    present: boolean;
    from: string;
    to: string;
  };
}> = ({ experience }) => {
  return (
    <View className="p-3 bg-primaryGray space-y-1 rounded-lg ">
      <View className="bg-white p-2 space-y-2 rounded-lg">
        <View className="space-y-1">
          <Text
            className="text-mainBlack/80"
            style={[globalStyles.semibold_text, globalStyles.normal_text]}
          >
            Work Experience
          </Text>
          <Text
            className="text-mainBlack"
            style={[globalStyles.semibold_text, globalStyles.normal_text]}
          >
            {experience.title}
          </Text>
          <Text
            className="text-[13px] text-mainBlack "
            style={[globalStyles.regular_text]}
          >
            {experience.organisation}
          </Text>
        </View>

        <Text
          className="text-[13px] text-secondarySix "
          style={[globalStyles.regular_text]}
        >
          {getMonthYear(experience.from)} {"-"}{" "}
          {experience.present ? "Present" : getMonthYear(experience.to)}
        </Text>
        <Text
          className="text-[13px] text-secondarySix "
          style={[globalStyles.regular_text]}
        >
          {experience.description}
        </Text>
      </View>
    </View>
  );
};

export const Certificate: React.FC<{
  certification: {
    date: string;
    description: string;
    id: string;
    name: string;
  };
}> = ({ certification }) => {
  return (
    <View className="p-3 bg-primaryGray space-y-1 rounded-lg ">
      <View className="bg-white p-2 space-y-2 rounded-lg">
        <View className="space-y-1">
          <Text
            className="text-mainBlack/80"
            style={[globalStyles.semibold_text, globalStyles.normal_text]}
          >
            Certification
          </Text>
          <Text
            className="text-mainBlack"
            style={[globalStyles.semibold_text, globalStyles.normal_text]}
          >
            {certification.name}
          </Text>
        </View>

        <Text
          className="text-[13px] text-secondarySix "
          style={[globalStyles.regular_text]}
        >
          {getMonthYear(certification.date)}
        </Text>
      </View>
    </View>
  );
};

export const Licence: React.FC<{
  licence: {
    description: string;
    from: string;
    id: string;
    name: string;
    to: string;
  };
}> = ({ licence }) => {
  return (
    <View className="p-3 bg-primaryGray space-y-1 rounded-lg ">
      <View className="bg-white p-2 space-y-2 rounded-lg">
        <View className="space-y-1">
          <Text
            className="text-mainBlack/80"
            style={[globalStyles.semibold_text, globalStyles.normal_text]}
          >
            Licence
          </Text>
          <Text
            className="text-mainBlack"
            style={[globalStyles.semibold_text, globalStyles.normal_text]}
          >
            {licence.name}
          </Text>
        </View>

        <Text
          className="text-[13px] text-secondarySix "
          style={[globalStyles.regular_text]}
        >
          {getMonthYear(licence.from)} {"-"} {getMonthYear(licence.to)}
        </Text>
      </View>
    </View>
  );
};

export const Languages: React.FC<{
  languages: Language[];
}> = ({ languages }) => {
  return (
    <View className="p-3 bg-primaryGray space-y-1 rounded-lg ">
      <View className="bg-white p-2 space-y-2 rounded-lg">
        <View className="space-y-1">
          <Text
            className="text-mainBlack/80"
            style={[globalStyles.semibold_text, globalStyles.normal_text]}
          >
            Languages
          </Text>
          <Text
            className="text-mainBlack"
            style={[globalStyles.semibold_text, globalStyles.normal_text]}
          >
            {languages.map((language) => language.name).join(", ")}
          </Text>
        </View>
      </View>
    </View>
  );
};
