import { View, Text, Pressable } from "react-native";
import React from "react";
import { Contact } from "../../utils/interface";
import ImageSvg from "./ImageSvg";
import { globalStyles } from "../../constants/styles";

interface Props extends Contact {
  component: React.ReactElement;
  handlePress?: () => void;
}

const ContactCard: React.FC<Props> = ({
  display_image,
  blur_hash,
  email,
  first_name,
  last_name,
  component,
  handlePress,
}) => {
  return (
    <Pressable
      onPress={() => handlePress?.()}
      className="flex-1 flex-row px-4 py-2 border border-secondaryFive justify-between items-center rounded-xl "
    >
      <View className="w-[17%]">
        <ImageSvg
          url={display_image}
          blurhash={blur_hash}
          style={{ width: 50, height: 50 }}
        />
      </View>
      <View className="w-[83%] flex-row justify-between items-center ">
        <View>
          <Text
            className="text-base text-[#444444]"
            style={[globalStyles.semibold_text]}
          >
            {first_name} {last_name}
          </Text>
          <Text
            className="text-[13px] text-secondaryTwo"
            style={[globalStyles.semibold_text]}
          >
            {email}
          </Text>
        </View>
        {component}
      </View>
    </Pressable>
  );
};

export default ContactCard;
