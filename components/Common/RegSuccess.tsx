import { View, Text } from "react-native";
import React from "react";
import { RegSuccessSvg } from "./svgs";
import { globalStyles } from "../../constants/styles";
import Button from "./Button";

interface Props {
  title: string;
  description: string;
  action: () => void;
}

const RegSuccess: React.FC<Props> = ({ title, description, action }) => {
  return (
    <View className="w-full items-center space-y-8 justify-center">
      <RegSuccessSvg />
      <View className="w-full items-center space-y-2 justify-center">
        <Text className="text-2xl" style={[globalStyles.semibold_text]}>
          {title}
        </Text>
        <Text
          className="text-base text-center"
          style={[globalStyles.regular_text]}
        >
          {description}
        </Text>
      </View>
      <Button
        text="Done"
        action={action}
        styles={{
          width: "auto",
          paddingHorizontal: 18,
          paddingVertical: 8,
          marginTop: 80,
        }}
        textStyles={{
          fontSize: 16,
        }}
      />
    </View>
  );
};

export default RegSuccess;
