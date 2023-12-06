import { View, Text, Pressable } from "react-native";
import React from "react";
import { Iconify } from "react-native-iconify";
import { globalStyles } from "../../constants/styles";
import { Switch } from "react-native-ui-lib";

type Props = {
  title: string;
  desc: string;
  icon: React.JSX.Element;
  action: () => void;
  showDesc?: boolean;
  isToggle?: boolean;
  toggleValue?: boolean;
  handleToggle?: () => void;
};

const ProfileListItem: React.FC<Props> = ({
  title,
  desc,
  icon,
  action,
  showDesc = true,
  isToggle = false,
  toggleValue,
  handleToggle,
}) => {
  return (
    <Pressable
      onPress={action}
      className="px-4 py-[14px] w-full flex flex-row space-x-5 items-center border-b-[0.5px] border-borderGrayTwo  "
    >
      <View className="w-9 h-9 bg-primaryTwo rounded-full flex justify-center items-center">
        {icon}
      </View>
      <View className="flex w-[86%] flex-row items-center justify-between">
        <View className="space-y-[2px]">
          <Text
            className="text-sm text-mainBlack "
            style={[globalStyles.semibold_text]}
          >
            {title}
          </Text>
          {showDesc && (
            <Text
              className="text-base text-neutral "
              style={[globalStyles.regular_text]}
            >
              {desc}
            </Text>
          )}
        </View>
        {isToggle ? (
          <Switch
            value={toggleValue}
            onValueChange={handleToggle}
            onColor="#8863F2"
          />
        ) : (
          <Iconify icon="charm:chevron-right" size={24} color="#9DA0A4" />
        )}
      </View>
    </Pressable>
  );
};

export default ProfileListItem;
