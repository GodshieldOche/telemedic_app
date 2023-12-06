import { View } from "react-native";
import React from "react";
import ProfileListItem from "../../../../components/Common/ProfileListItem";
import { Iconify } from "react-native-iconify";
import { router } from "expo-router";

const AccountSettings = () => {
  return (
    <View className="flex-1  py-6  bg-white">
      <View
        style={{
          rowGap: 4,
        }}
      >
        <ProfileListItem
          title="Change Password"
          desc="Update your Password"
          icon={
            <Iconify
              icon="fluent:key-reset-20-filled"
              size={24}
              color="#8863F2"
            />
          }
          action={() => router.push("/(user)/settings/account/change_password")}
        />
        <ProfileListItem
          title="Deactivate/Delete Account"
          desc="Deactivation & Deletion of Account"
          icon={
            <Iconify
              icon="material-symbols:auto-delete"
              size={24}
              color="#8863F2"
            />
          }
          action={() => router.push("/(user)/settings/account/delete_account")}
        />
      </View>
    </View>
  );
};

export default AccountSettings;
