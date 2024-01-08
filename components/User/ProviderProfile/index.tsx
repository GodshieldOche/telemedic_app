import { View, Text } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { globalStyles } from "../../../constants/styles";
import { Iconify } from "react-native-iconify";
import AddressBox from "../../Common/AddressBox";
import IconBox from "../../Common/IconBox";
import Home from "./Home";
import Photos from "./Photos";
import Videos from "./Videos";
import Reviews from "./Reviews";
import { TabController } from "react-native-ui-lib";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { Practitioner } from "../../../utils/interface";
import { truncate } from "lodash";

const ProviderProfile: React.FC<{ data: Practitioner }> = ({ data }) => {
  const tabs = {
    home: <Home data={data} />,
    photos: <Photos values={data.images} />,
    videos: <Videos values={data.videos} />,
    reviews: <Reviews />,
  };

  const state = data.address.state.name;
  const city = data.address.city.name;

  return (
    <View className="pb-10 space-y-5 flex-1 relative">
      <View className="space-y-5 px-4">
        {/* Header/Share/Like */}
        <View className="space-y-2">
          <View className="w-full relative">
            <Image
              source={
                data.banner_image
                  ? data.banner_image
                  : require("../../../assets/images/rainbow.png")
              }
              contentPosition="top"
              placeholder={data.banner_blur_hash}
              className="w-full h-[119px] rounded-lg "
              alt="Banner Image"
            />
            <View className=" absolute left-4 top-[55%] p-[2px] rounded-lg w-[92px] h-[85px] bg-white ">
              <Image
                source={
                  data.profile_image
                    ? data.profile_image
                    : require("../../../assets/images/profile_img.png")
                }
                contentPosition="top"
                placeholder={data.blur_hash}
                className="w-full h-full rounded "
                alt="Profile Image"
              />
            </View>
          </View>
          <View className="w-full flex flex-row justify-end items-center space-x-[18px] ">
            <Iconify icon="icon-park-outline:like" size={24} color="#494949" />
            <Iconify icon="ic:round-share" size={24} color="#494949" />
          </View>
        </View>

        {/* Basic Info */}
        <View className="w-full space-y-3 justify-center items-center py-4 px-3 rounded-lg border border-borderGray ">
          <Text
            className="text-mainBlack"
            style={[globalStyles.regular_text, globalStyles.big_text]}
          >
            Dr. {data.first_name} {data.last_name}
          </Text>
          <View className="w-full justify-between flex-row">
            <AddressBox
              address={`${city}, ${truncate(state, {
                length: 12,
              })}`}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 4,
                backgroundColor: "#F2EFFF",
                borderRadius: 9999,
              }}
              textStyle={{
                color: "#8863F2",
              }}
              color="#8863F2"
            />
            <IconBox
              style={{
                backgroundColor: "#D7EDF6",
              }}
              icon={
                <Iconify
                  icon="ic:baseline-design-services"
                  size={18}
                  color="#2F6F89"
                />
              }
              text={truncate(data.practice, { length: 20 })}
            />
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
          </View>
        </View>
      </View>

      {/* Tab */}
      <View
        style={{
          rowGap: 16,
        }}
      >
        <TabController
          items={[
            { label: "home" },
            { label: "photos" },
            { label: "videos" },
            { label: "reviews" },
          ]}
          asCarousel
        >
          <TabController.TabBar
            labelStyle={{
              fontSize: 16,
              textTransform: "capitalize",
              fontWeight: "bold",
              fontFamily: "Nunito_Bold",
            }}
            labelColor="#6D7580"
            selectedLabelColor="#2B2B2B"
            selectedLabelStyle={{
              fontSize: 16,
              textTransform: "capitalize",
              fontWeight: "bold",
              fontFamily: "Nunito_Bold",
            }}
            indicatorStyle={{
              backgroundColor: "#2B2B2B",
              height: 2,
            }}
            height={40}
          />
          <TabController.PageCarousel>
            <>
              {Object.keys(tabs).map((key, index) => (
                <TabController.TabPage
                  key={key}
                  index={index - 1}
                  lazy={key !== "home"}
                >
                  {tabs[key as keyof typeof tabs]}
                </TabController.TabPage>
              ))}
            </>
          </TabController.PageCarousel>
        </TabController>
      </View>
    </View>
  );
};

export default gestureHandlerRootHOC(ProviderProfile);
