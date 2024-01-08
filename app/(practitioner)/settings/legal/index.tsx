import { View } from "react-native";
import React from "react";
import ProfileListItem from "../../../../components/Common/ProfileListItem";
import { Iconify } from "react-native-iconify";

const Legal = () => {
  return (
    <View className="flex-1  py-6  bg-white">
      <View
        style={{
          rowGap: 4,
        }}
      >
        <ProfileListItem
          title="Privacy Policy"
          desc="Read about our Privacy Policy"
          icon={
            <Iconify
              icon="eos-icons:network-policy"
              size={24}
              color="#8863F2"
            />
          }
          action={() => {}}
        />
        <ProfileListItem
          title="Terms & Conditions"
          desc="Read About our Teams and Conditioin"
          icon={<Iconify icon="ion:terminal" size={24} color="#8863F2" />}
          action={() => {}}
        />
      </View>
    </View>
  );
};

export default Legal;
