import { ActivityIndicator, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { deleteSecure } from "../../../utils/helper";
import { router } from "expo-router";
import { Image } from "expo-image";
import { globalStyles } from "../../../constants/styles";
import AddressBox from "../../../components/Common/AddressBox";
import IconBox from "../../../components/Common/IconBox";
import { Iconify } from "react-native-iconify";
import { truncate } from "lodash";
import ProfileListItem from "../../../components/Common/ProfileListItem";
import { Circle, Path, Svg } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import { messageAlert } from "../../../components/Common/Alerts";
import { updateProfileOrBannerImage } from "../../../redux/slices/practitioner/profile";
import Loader from "../../../components/Common/Loader";
import InfoSensitiveModal from "../../../components/Modals/InfoSensitive";

const SettingsIndexPage = () => {
  const { data } = useAppSelector((state) => state.practitionerProfile);

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState({
    isLoading: false,
    type: "",
  });

  if (!data) {
    return <Loader />;
  }
  const [modalVisible, setModalVisible] = useState(false);

  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    setLoading(true);
    await deleteSecure("practitionerToken");
    setLoading(false);
    setModalVisible(false);
    router.replace("/(auth)/");
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handlePress = async (type: string) => {
    try {
      const media = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: false,
        mediaTypes: ImagePicker.MediaTypeOptions["Images"],
      });
      if (media.canceled) {
        return;
      }
      const body = new FormData();
      const file = {
        uri: media.assets[0].uri,
        type: media.assets[0].type,
        name: media.assets[0].fileName,
      };
      body.append(type, file as any);
      setImageLoading({
        isLoading: true,
        type,
      });
      const params = {
        type,
      };
      const res = await dispatch(updateProfileOrBannerImage({ body, params }));
      if (res.error) {
        messageAlert(
          "Error",
          (res?.payload && res?.payload[0]?.error) || "Something went wrong"
        );
        return setImageLoading({
          isLoading: false,
          type: "",
        });
      }
      setImageLoading({
        isLoading: false,
        type: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const state = data.address.state.name;
  const city = data.address.city.name;

  return (
    <View
      style={{
        paddingTop: insets.top,
      }}
      className="flex-1 bg-white"
    >
      <ScrollView className=" py-6  flex-1">
        <View className="space-y-6 pb-8">
          {/* Header */}
          <View className="space-y-12 px-4">
            <View className="w-full relative">
              <View className="relative">
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
                {imageLoading.isLoading &&
                  imageLoading.type === "banner_image" && (
                    <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/40 ">
                      <ActivityIndicator color="white" size={24} />
                    </View>
                  )}
                <Pressable
                  onPress={() => handlePress("banner_image")}
                  className="w-8 h-8 absolute -bottom-3 -right-1 items-center justify-center rounded-full bg-white "
                >
                  <Iconify icon="mdi:pencil" size={24} color="#8863F2" />
                </Pressable>
              </View>
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
                {imageLoading.isLoading &&
                  imageLoading.type === "profile_image" && (
                    <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/40 ">
                      <ActivityIndicator color="white" size={24} />
                    </View>
                  )}
                <Pressable
                  onPress={() => handlePress("profile_image")}
                  className="w-8 h-8 absolute -top-3 -left-2 items-center justify-center rounded-full bg-white "
                >
                  <Iconify icon="mdi:pencil" size={24} color="#8863F2" />
                </Pressable>
              </View>
            </View>
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
                  text={data.rating.toString()}
                />
              </View>
            </View>
          </View>
          {/* Body */}
          <View
            style={{
              rowGap: 4,
            }}
          >
            <ProfileListItem
              title="Personal Information"
              desc="Your personal information"
              icon={
                <Iconify icon="mdi:bag-personal" size={24} color="#8863F2" />
              }
              action={() =>
                router.push("/(practitioner)/settings/personal_information/")
              }
            />
            <ProfileListItem
              title="Practitioner Information"
              desc="Your information as a practitioner"
              icon={
                <Iconify
                  icon="healthicons:doctor-male"
                  size={24}
                  color="#8863F2"
                />
              }
              action={() => router.push("/(practitioner)/(tabs)/settings")}
            />
            <ProfileListItem
              title="Bank Information"
              desc="Add/Delete your bank Information"
              icon={
                <Svg width="36" height="37" viewBox="0 0 36 37" fill="none">
                  <Circle cx="18" cy="18.875" r="18" fill="#F2EFFF" />
                  <Path
                    d="M27 17.0972V25.9861C27 26.2219 26.9052 26.448 26.7364 26.6147C26.5676 26.7814 26.3387 26.875 26.1 26.875H9.9C9.66131 26.875 9.43239 26.7814 9.2636 26.6147C9.09482 26.448 9 26.2219 9 25.9861V17.0972H27ZM27 15.3194H9V11.7639C9 11.5281 9.09482 11.302 9.2636 11.1353C9.43239 10.9687 9.66131 10.875 9.9 10.875H26.1C26.3387 10.875 26.5676 10.9687 26.7364 11.1353C26.9052 11.302 27 11.5281 27 11.7639V15.3194ZM20.7 22.4306V24.2083H24.3V22.4306H20.7Z"
                    fill="#8863F2"
                  />
                </Svg>
              }
              action={() => router.push("/(practitioner)/(tabs)/settings")}
            />
            <ProfileListItem
              title="Clients Statistics"
              desc="See your progress so far"
              icon={
                <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.24615 1.875C1.91565 1.875 1.59869 2.00629 1.36499 2.23999C1.13129 2.47369 1 2.79065 1 3.12115V18.6288C1 19.3175 1.55754 19.875 2.24615 19.875H17.7538C17.9175 19.875 18.0795 19.8428 18.2307 19.7801C18.3819 19.7175 18.5193 19.6257 18.635 19.51C18.7507 19.3943 18.8425 19.2569 18.9051 19.1057C18.9678 18.9545 19 18.7925 19 18.6288V3.12115C19 2.95751 18.9678 2.79546 18.9051 2.64427C18.8425 2.49308 18.7507 2.35571 18.635 2.23999C18.5193 2.12427 18.3819 2.03248 18.2307 1.96986C18.0795 1.90723 17.9175 1.875 17.7538 1.875H2.24615ZM14.3846 7.18269C14.3846 6.99908 14.3117 6.82299 14.1818 6.69316C14.052 6.56332 13.8759 6.49038 13.6923 6.49038C13.5087 6.49038 13.3326 6.56332 13.2028 6.69316C13.0729 6.82299 13 6.99908 13 7.18269V14.5673C13 14.7509 13.0729 14.927 13.2028 15.0568C13.3326 15.1867 13.5087 15.2596 13.6923 15.2596C13.8759 15.2596 14.052 15.1867 14.1818 15.0568C14.3117 14.927 14.3846 14.7509 14.3846 14.5673V7.18269ZM10 9.25962C10.1836 9.25962 10.3597 9.33256 10.4895 9.46239C10.6194 9.59222 10.6923 9.76831 10.6923 9.95192V14.5673C10.6923 14.7509 10.6194 14.927 10.4895 15.0568C10.3597 15.1867 10.1836 15.2596 10 15.2596C9.81639 15.2596 9.6403 15.1867 9.51046 15.0568C9.38063 14.927 9.30769 14.7509 9.30769 14.5673V9.95192C9.30769 9.76831 9.38063 9.59222 9.51046 9.46239C9.6403 9.33256 9.81639 9.25962 10 9.25962ZM7 11.7981C7 11.6145 6.92706 11.4384 6.79723 11.3085C6.66739 11.1787 6.4913 11.1058 6.30769 11.1058C6.12408 11.1058 5.94799 11.1787 5.81816 11.3085C5.68832 11.4384 5.61538 11.6145 5.61538 11.7981V14.5673C5.61538 14.7509 5.68832 14.927 5.81816 15.0568C5.94799 15.1867 6.12408 15.2596 6.30769 15.2596C6.4913 15.2596 6.66739 15.1867 6.79723 15.0568C6.92706 14.927 7 14.7509 7 14.5673V11.7981Z"
                    fill="#8863F2"
                  />
                </Svg>
              }
              action={() => router.push("/(practitioner)/(tabs)/settings")}
            />
            <ProfileListItem
              title="Password/Account Settings"
              desc="Update your Account Details"
              icon={
                <Iconify icon="mdi:account-cog" size={24} color="#8863F2" />
              }
              action={() => router.push("/(practitioner)/settings/account/")}
            />
            <ProfileListItem
              title="Notification"
              desc="Push & Email Notification"
              icon={
                <Svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M16.8253 11.7166L15.8837 10.1499C15.6753 9.80825 15.492 9.14992 15.492 8.74992V7.19159C15.492 4.16659 13.0337 1.70825 10.017 1.70825C6.992 1.71659 4.53367 4.16659 4.53367 7.19159V8.74159C4.53367 9.14159 4.35033 9.79992 4.15033 10.1416L3.20867 11.7083C2.85033 12.3166 2.767 13.0083 2.992 13.6083C3.217 14.2166 3.72533 14.6999 4.392 14.9166C5.292 15.2166 6.20033 15.4333 7.12533 15.5916C7.217 15.6083 7.30866 15.6166 7.40033 15.6333C7.517 15.6499 7.642 15.6666 7.767 15.6833C7.98366 15.7166 8.20033 15.7416 8.42533 15.7583C8.95033 15.8083 9.48367 15.8333 10.017 15.8333C10.542 15.8333 11.067 15.8083 11.5837 15.7583C11.7753 15.7416 11.967 15.7249 12.1503 15.6999C12.3003 15.6833 12.4503 15.6666 12.6003 15.6416C12.692 15.6333 12.7837 15.6166 12.8753 15.5999C13.8087 15.4499 14.7337 15.2166 15.6337 14.9166C16.2753 14.6999 16.767 14.2166 17.0003 13.5999C17.2337 12.9749 17.167 12.2916 16.8253 11.7166ZM10.6253 8.33325C10.6253 8.68325 10.342 8.96659 9.992 8.96659C9.642 8.96659 9.35866 8.68325 9.35866 8.33325V5.74992C9.35866 5.39992 9.642 5.11659 9.992 5.11659C10.342 5.11659 10.6253 5.39992 10.6253 5.74992V8.33325Z"
                    fill="#8863F2"
                  />
                  <Path
                    d="M12.3568 16.6751C12.0068 17.6417 11.0818 18.3334 9.99844 18.3334C9.3401 18.3334 8.6901 18.0667 8.23177 17.5917C7.9651 17.3417 7.7651 17.0084 7.64844 16.6667C7.75677 16.6834 7.8651 16.6917 7.98177 16.7084C8.17344 16.7334 8.37344 16.7584 8.57344 16.7751C9.04844 16.8167 9.53177 16.8417 10.0151 16.8417C10.4901 16.8417 10.9651 16.8167 11.4318 16.7751C11.6068 16.7584 11.7818 16.7501 11.9484 16.7251C12.0818 16.7084 12.2151 16.6917 12.3568 16.6751Z"
                    fill="#8863F2"
                  />
                </Svg>
              }
              action={() =>
                router.push("/(practitioner)/settings/notification/")
              }
            />
            <ProfileListItem
              title="Help & Support"
              desc="Contact Medicare"
              icon={
                <Iconify
                  icon="ic:sharp-contact-support"
                  size={24}
                  color="#8863F2"
                />
              }
              action={() => router.push("/(practitioner)/settings/help/")}
            />
            <ProfileListItem
              title="Legal"
              desc="Privacy Policy, Terms and Condition"
              icon={<Iconify icon="fa:legal" size={24} color="#8863F2" />}
              action={() => router.push("/(practitioner)/settings/legal/")}
            />
            <ProfileListItem
              title="Sign Out"
              desc=""
              icon={<Iconify icon="uis:signout" size={24} color="#E1604D" />}
              showDesc={false}
              action={() => setModalVisible(true)}
              styles={{
                borderBottomColor: "transparent",
              }}
            />
          </View>
        </View>
      </ScrollView>
      <InfoSensitiveModal
        closeModal={closeModal}
        action={handleLogout}
        modalVisible={modalVisible}
        loading={loading}
        question="Are You Sure you want to Sign out?"
        closeButtonText="No. Go Back"
        actionButtonText="Yes. Sign Out"
      />
    </View>
  );
};

export default SettingsIndexPage;
