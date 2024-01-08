import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../constants/styles";
import AddressBox from "../../../components/Common/AddressBox";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import Loader from "../../../components/Common/Loader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { deleteSecure } from "../../../utils/helper";
import { router } from "expo-router";
import ProfileListItem from "../../../components/Common/ProfileListItem";
import { Iconify } from "react-native-iconify";
import { Path, Svg } from "react-native-svg";
import InfoSensitiveModal from "../../../components/Modals/InfoSensitive";
import ImageSvg from "../../../components/Common/ImageSvg";
import { EditButton } from "../../../components/Common/svgs";
import * as ImagePicker from "expo-image-picker";
import { addOrUpdateProfileImage } from "../../../redux/slices/user/profile";
import { messageAlert } from "../../../components/Common/Alerts";

const SettingsIndexPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const { data } = useAppSelector((state) => state.userProfile);
  const {
    location: { city, street },
  } = useAppSelector((state) => state.location);
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  if (!data) {
    return <Loader />;
  }

  const handleLogout = async () => {
    setLoading(true);
    await deleteSecure("userToken");
    setLoading(false);
    setModalVisible(false);
    router.replace("/(auth)/");
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handlePress = async () => {
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
      body.append("profile_image", file as any);
      setImageLoading(true);
      const res = await dispatch(addOrUpdateProfileImage(body));
      if (res.error) {
        messageAlert(
          "Error",
          (res?.payload && res?.payload[0]?.error) || "Something went wrong"
        );
        return setImageLoading(false);
      }
      setImageLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        paddingTop: insets.top,
      }}
      className="flex-1 bg-white"
    >
      <ScrollView className=" py-6  flex-1">
        <View className="space-y-8 pb-8 flex-1  ">
          {/* Header */}
          <View className="px-4">
            <View className="p-3 bg-primaryGray space-y-2 justify-center items-center rounded-lg ">
              {/* Profile Image */}
              <View className="relative">
                <ImageSvg
                  url={data.display_photo}
                  blurhash={data.blur_hash}
                  style={{ width: 64, height: 64 }}
                />
                {imageLoading && (
                  <View className="absolute top-0 left-0 right-0 bottom-0 rounded-full justify-center items-center bg-black/40 ">
                    <ActivityIndicator color="white" size={24} />
                  </View>
                )}

                <Pressable
                  onPress={handlePress}
                  className="w-6 h-6 bg-primaryOne justify-center items-center rounded absolute bottom-0 -right-1"
                >
                  <EditButton />
                </Pressable>
              </View>
              {/* Name */}
              <Text
                className="text-mainBlack text-lg"
                style={[globalStyles.regular_text]}
              >
                {data.first_name} {data.last_name}
              </Text>
              {/* Address */}
              <AddressBox
                color="#8863F2"
                textStyle={{
                  color: "#858C94",
                }}
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 19,
                  backgroundColor: "#F2EFFF",
                }}
                address={`${city}, ${street}`}
              />
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
                router.push("/(user)/settings/personal_information/")
              }
            />

            <ProfileListItem
              title="My Family & Friends"
              desc="Add your family & friends"
              icon={
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M13.3346 3.33341C13.3346 2.40841 14.0763 1.66675 15.0013 1.66675C15.9263 1.66675 16.668 2.40841 16.668 3.33341C16.668 4.25841 15.9263 5.00008 15.0013 5.00008C14.0763 5.00008 13.3346 4.25841 13.3346 3.33341ZM16.668 18.3334V13.3334H18.7513L16.2513 5.83341H13.7513L12.7763 8.75008H14.168V18.3334H16.668ZM10.418 9.58341C11.1096 9.58341 11.668 9.02508 11.668 8.33341C11.668 7.64175 11.1096 7.08341 10.418 7.08341C9.7263 7.08341 9.16797 7.64175 9.16797 8.33341C9.16797 9.02508 9.7263 9.58341 10.418 9.58341ZM4.58464 5.00008C5.50964 5.00008 6.2513 4.25841 6.2513 3.33341C6.2513 2.40841 5.50964 1.66675 4.58464 1.66675C3.65964 1.66675 2.91797 2.40841 2.91797 3.33341C2.91797 4.25841 3.65964 5.00008 4.58464 5.00008ZM6.2513 18.3334V12.5001H7.5013V5.83341H1.66797V12.5001H2.91797V18.3334H6.2513ZM11.668 18.3334V15.0001H12.5013V10.4167H8.33464V15.0001H9.16797V18.3334H11.668Z"
                    fill="#8863F2"
                  />
                </Svg>
              }
              action={() => router.push("/(user)/settings/relationships/")}
            />

            <ProfileListItem
              title="Medical Information"
              desc="All your medical information"
              icon={
                <Iconify
                  icon="material-symbols:cardiology-rounded"
                  size={24}
                  color="#8863F2"
                />
              }
              action={() =>
                router.push("/(user)/settings/medical_information/")
              }
            />

            <ProfileListItem
              title="Electronic Health Records"
              desc="Your personalized health records"
              icon={
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M18.3346 6.50841V10.4167H14.9346C14.8346 10.4084 14.618 10.2834 14.568 10.1917L13.7013 8.55008C13.3596 7.90008 12.768 7.53341 12.1346 7.56675C11.5013 7.60008 10.9596 8.02508 10.6846 8.71675L9.53464 11.6001L9.36797 11.1667C8.95964 10.1084 7.79297 9.30841 6.64297 9.30841L1.66797 9.33341V6.50841C1.66797 3.47508 3.4763 1.66675 6.50964 1.66675H13.493C16.5263 1.66675 18.3346 3.47508 18.3346 6.50841Z"
                    fill="#8863F2"
                  />
                  <Path
                    d="M18.3346 13.4916V11.6666H14.9346C14.3763 11.6666 13.718 11.2666 13.4596 10.775L12.593 9.13329C12.3596 8.69162 12.0263 8.71662 11.843 9.17496L9.9263 14.0166C9.71797 14.5583 9.36797 14.5583 9.1513 14.0166L8.2013 11.6166C7.9763 11.0333 7.2763 10.5583 6.6513 10.5583L1.66797 10.5833V13.4916C1.66797 16.475 3.41797 18.275 6.35964 18.325C6.4513 18.3333 6.5513 18.3333 6.64297 18.3333H13.3096C13.4346 18.3333 13.5596 18.3333 13.6763 18.325C16.6013 18.2583 18.3346 16.4666 18.3346 13.4916Z"
                    fill="#8863F2"
                  />
                  <Path
                    d="M1.66562 10.5833V13.3416C1.64896 13.0749 1.64062 12.7916 1.64062 12.4999V10.5833H1.66562Z"
                    fill="#8863F2"
                  />
                </Svg>
              }
              action={() => {}}
            />

            <ProfileListItem
              title="Shipping Information"
              desc="Shipping Information "
              icon={
                <Iconify
                  icon="fa-solid:shipping-fast"
                  size={18}
                  color="#8863F2"
                />
              }
              action={() =>
                router.push("/(user)/settings/shipping_information/")
              }
            />
            <ProfileListItem
              title="Password/ Account Settings"
              desc="Change password/ Deactivate account"
              icon={
                <Iconify icon="mdi:account-cog" size={24} color="#8863F2" />
              }
              action={() => router.push("/(user)/settings/account/")}
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
              action={() => router.push("/(user)/settings/notification/")}
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
              action={() => router.push("/(user)/settings/help/")}
            />
            <ProfileListItem
              title="Legal"
              desc="Privacy Policy, Terms and Condition"
              icon={<Iconify icon="fa:legal" size={24} color="#8863F2" />}
              action={() => router.push("/(user)/settings/legal/")}
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
