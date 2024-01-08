import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { Iconify } from "react-native-iconify";
import Button from "./Button";
import { Resource } from "../../utils/interface";
import { LinkProps, router } from "expo-router";
import IconBox from "./IconBox";
import { Path, Svg } from "react-native-svg";

type Props = {
  resource: Resource;
  isLastItem?: boolean;
  isOddTotal?: boolean;
};

const ViewCard: React.FC<Props> = ({ resource, isLastItem, isOddTotal }) => {
  const route: LinkProps<string>["href"] =
    resource.type === "practitioner"
      ? (`/(user)/practitioners/${resource.id}` as LinkProps<string>["href"])
      : (`/(user)/facilities/${resource.id}` as LinkProps<string>["href"]);

  return (
    <View
      className="border border-secondaryFive rounded-[10px] p-2 "
      style={{
        rowGap: 12,
        flex: isLastItem && isOddTotal ? 0.455 : 1,
      }}
    >
      <View className=" h-28">
        <Image
          className="w-full h-full rounded-[10px]"
          source={
            resource.display_picture
              ? resource.display_picture
              : require("../../assets/images/person_male.jpg")
          }
          contentPosition="top"
          placeholder={resource.blur_hash}
        />
      </View>
      <View className="space-y-2">
        {/* Text */}
        <View className="space-y-1">
          <Pressable onPress={() => router.push(route)}>
            <Text
              className="text-mainBlack text-[13px]"
              style={[globalStyles.semibold_text]}
            >
              {resource.name}
            </Text>
          </Pressable>
          <Text
            className="text-[11px] text-mainGray "
            style={[globalStyles.semibold_text]}
          >
            {resource.tag}
          </Text>
        </View>

        {/* Rating / Distance */}
        <View className="flex flex-row justify-between items-center ">
          <IconBox
            icon={
              <Iconify
                icon="line-md:star-alt-filled"
                size={18}
                color="#F5AF44"
              />
            }
            text="4.5"
          />
          {resource.type === "practitioner" ? (
            <IconBox
              style={{
                backgroundColor: "#ECFFFA",
              }}
              icon={
                <Svg width="19" height="18" viewBox="0 0 19 18" fill="none">
                  <Path
                    d="M14.8762 4.98014C14.5537 3.35264 13.3463 2.64014 11.6663 2.64014H5.08125C3.10125 2.64014 1.78125 3.63014 1.78125 5.94014V9.80264C1.78125 11.4676 2.46375 12.4426 3.58875 12.8626C3.75375 12.9226 3.93375 12.9751 4.12125 13.0051C4.42125 13.0726 4.74375 13.1026 5.08125 13.1026H11.6737C13.6537 13.1026 14.9738 12.1126 14.9738 9.80264V5.94014C14.9738 5.58764 14.9437 5.27264 14.8762 4.98014ZM4.64625 9.00014C4.64625 9.30764 4.39125 9.56264 4.08375 9.56264C3.77625 9.56264 3.52125 9.30764 3.52125 9.00014V6.75014C3.52125 6.44264 3.77625 6.18764 4.08375 6.18764C4.39125 6.18764 4.64625 6.44264 4.64625 6.75014V9.00014ZM8.37375 9.85514C7.27875 9.85514 6.39375 8.97014 6.39375 7.87514C6.39375 6.78014 7.27875 5.89514 8.37375 5.89514C9.46875 5.89514 10.3538 6.78014 10.3538 7.87514C10.3538 8.97014 9.46875 9.85514 8.37375 9.85514ZM13.2187 9.00014C13.2187 9.30764 12.9637 9.56264 12.6562 9.56264C12.3487 9.56264 12.0938 9.30764 12.0938 9.00014V6.75014C12.0938 6.44264 12.3487 6.18764 12.6562 6.18764C12.9637 6.18764 13.2187 6.44264 13.2187 6.75014V9.00014Z"
                    fill="#008C68"
                  />
                  <Path
                    d="M17.2243 8.19021V12.0527C17.2243 14.3627 15.9043 15.3602 13.9168 15.3602H7.33184C6.76934 15.3602 6.26684 15.2777 5.83184 15.1127C5.47934 14.9852 5.17184 14.7977 4.92434 14.5577C4.78934 14.4302 4.89434 14.2277 5.08184 14.2277H11.6668C14.4418 14.2277 16.0918 12.5777 16.0918 9.81021V5.94021C16.0918 5.76021 16.2943 5.64771 16.4218 5.78271C16.9318 6.32271 17.2243 7.11021 17.2243 8.19021Z"
                    fill="#008C68"
                  />
                </Svg>
              }
              text={`₦ ${resource.hourly_rate}/hr`}
            />
          ) : (
            <IconBox
              style={{
                backgroundColor: "#ECFFFA",
              }}
              icon={
                <Iconify
                  icon="ic:baseline-add-location"
                  size={18}
                  color="#008C68"
                />
              }
              text="4.5Km"
            />
          )}
        </View>
      </View>
      {resource.type === "practitioner" ? (
        <Button
          text="Book Appointment"
          textStyles={{
            fontSize: 13,
          }}
          styles={{
            paddingVertical: 8,
          }}
          action={() => ""}
        />
      ) : (
        <View
          className="w-full flex flex-row justify-between"
          style={{
            columnGap: 8,
          }}
        >
          <IconButton
            icon={
              <Iconify icon="ic:baseline-phone" size={16} color="#8863F2" />
            }
            text="Call"
            action={() => ""}
          />
          <IconButton
            icon={<Iconify icon="ic:baseline-chat" size={16} color="#8863F2" />}
            text="Chat"
            action={() => ""}
          />
        </View>
      )}
    </View>
  );
};

export default ViewCard;

const IconButton: React.FC<{
  icon: React.JSX.Element;
  text: string;
  action?: any;
}> = ({ icon, text, action }) => {
  return (
    <Pressable
      onPress={() => action}
      className="px-[14px] flex-1 py-2 space-x-1 rounded-md  bg-secondaryOne flex flex-row justify-center "
    >
      {icon}
      <Text
        className="text-xs text-primaryOne"
        style={[globalStyles.semibold_text]}
      >
        {text}
      </Text>
    </Pressable>
  );
};
