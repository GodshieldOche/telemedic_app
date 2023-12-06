import { View, Text, Image } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import Button from "./Button";

type Props = {
  text: string;
  title: string;
  action: () => void;
};

const EmptyButtonView: React.FC<Props> = ({ text, title, action }) => {
  return (
    <View
      className="px-6"
      style={{
        rowGap: 54,
      }}
    >
      <View
        className="!mt-12 justify-center items-center"
        style={{
          rowGap: 16,
        }}
      >
        <Image
          source={require("../../assets/images/no_result.png")}
          className="w-[320px] h-[280px]"
        />
        <Text
          className="text-mainBlack text-center text-base"
          style={[globalStyles.regular_text]}
        >
          {title}
        </Text>
      </View>
      <Button text={text} action={action} />
    </View>
  );
};

export default EmptyButtonView;
