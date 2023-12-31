import { View, Text, Pressable } from "react-native";
import React from "react";
import { globalStyles } from "../../../constants/styles";
import { Iconify } from "react-native-iconify";
import { User } from "../../../utils/interface";
import { router } from "expo-router";
import { useAppSelector } from "../../../hooks/useDispatch";
import NotifIcon from "../../Common/NotifIcon";
import ImageSvg from "../../Common/ImageSvg";

interface Props {
  data: User;
}

const Header: React.FC<Props> = ({ data }) => {
  const {
    location: { city, street },
  } = useAppSelector((state) => state.location);
  return (
    <View className="px-4">
      <View className="border relative w-full p-4 flex flex-row justify-between items-center rounded-[10px] border-borderGray">
        <View className="flex flex-row space-x-3 items-center ">
          <Pressable onPress={() => router.push("/(user)/(tabs)/settings")}>
            <ImageSvg
              url={data.display_photo}
              blurhash={data.blur_hash}
              style={{ width: 51, height: 51 }}
            />
          </Pressable>
          <View className="space-y-[7px]">
            <Text
              className="text-secondaryBlack"
              style={[globalStyles.semibold_text, globalStyles.normal_text]}
            >
              {`${data?.first_name} ${data?.last_name}`}
            </Text>
            <View className="flex flex-row items-center space-x-1">
              <Iconify
                icon="fluent:location-16-filled"
                color="#858C94"
                size={14}
              />
              <Text
                className="text-[13px] text-mainGray "
                style={[globalStyles.regular_text]}
              >
                {`${street}, ${city}`}
              </Text>
            </View>
          </View>
        </View>
        <View
          className="flex flex-row "
          style={{
            columnGap: 12,
          }}
        >
          <Iconify icon="ic:round-search" size={24} color="#858C94" />
          <Iconify
            icon="heroicons-outline:shopping-cart"
            size={24}
            color="#858C94"
          />
          <NotifIcon />
        </View>
      </View>
    </View>
  );
};

export default Header;
