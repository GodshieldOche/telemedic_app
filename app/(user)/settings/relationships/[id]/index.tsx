import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import ImageSvg from "../../../../../components/Common/ImageSvg";
import useAppDispatch, {
  useAppSelector,
} from "../../../../../hooks/useDispatch";
import { router, useLocalSearchParams } from "expo-router";
import {
  deleteRelationship,
  getFamilyFriendDetails,
} from "../../../../../redux/slices/user/relationship";
import Loader from "../../../../../components/Common/Loader";
import { globalStyles } from "../../../../../constants/styles";
import ProfileListItem from "../../../../../components/Common/ProfileListItem";
import { Path, Svg } from "react-native-svg";
import Button from "../../../../../components/Common/Button";
import { messageAlert } from "../../../../../components/Common/Alerts";
import InfoSensitiveModal from "../../../../../components/Modals/InfoSensitive";

const FamilyFriendDetails = () => {
  const { data, isDataLoading } = useAppSelector((state) => state.relationship);
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getFamilyFriendDetails({ signal, id }));
    return () => {
      controller.abort();
    };
  }, [id]);

  if (isDataLoading || !data) {
    return <Loader />;
  }

  const handleDeleteContact = async () => {
    setDeleting(true);
    const res = await dispatch(deleteRelationship(id!));

    if (res.error) {
      messageAlert(
        "Error",
        (res?.payload && res?.payload[0]?.error) || "Something went wrong"
      );
      return setDeleting(false);
    }

    setDeleting(false);
    setModalVisible(false);
    router.push("/(user)/settings/relationships");
  };

  return (
    <View className="py-6 bg-white flex-1">
      <ScrollView className="">
        <View className="flex-1 space-y-6">
          <View className="px-4">
            <View className="p-3 bg-primaryGray space-y-2 justify-center items-center rounded-lg ">
              {/* Profile Image */}
              <View className="relative">
                <ImageSvg
                  url={data.display_image}
                  blurhash={data.blur_hash}
                  style={{ width: 56, height: 56 }}
                />
              </View>
              {/* Name */}
              <Text
                className="text-mainBlack text-lg"
                style={[globalStyles.regular_text]}
              >
                {data.first_name} {data.last_name}
              </Text>
              {/* Relationship Type */}
              <View
                className="w-[90px] py-2 justify-center items-center rounded-full"
                style={{
                  backgroundColor: "#F7DEB3",
                }}
              >
                <Text
                  className="text-darkGray capitalize text-sm"
                  style={[globalStyles.regular_text]}
                >
                  {data.relationship}
                </Text>
              </View>
            </View>
          </View>
          {data.can_view_ehr && (
            <View>
              <ProfileListItem
                title="Electronic Health Records"
                desc="View EHR of this Contact"
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
            </View>
          )}

          <View className="py-7 px-8">
            <Button
              text={data.is_approved ? "Delete Contact" : "Delete Request"}
              loading={false}
              action={() => setModalVisible(true)}
              styles={{
                backgroundColor: "transparent",
                borderColor: "#E1604D",
                borderWidth: 2,
                width: "100%",
              }}
              textStyles={{
                color: "#E1604D",
              }}
            />
          </View>
        </View>
      </ScrollView>

      <InfoSensitiveModal
        closeModal={() => setModalVisible(false)}
        action={handleDeleteContact}
        modalVisible={modalVisible}
        loading={isDeleting}
        question="Are You Sure?"
        closeButtonText="No. Go Back"
        actionButtonText={`Yes, ${
          data.is_approved ? "Delete Contact" : "Delete Request"
        }`}
      />
    </View>
  );
};

export default FamilyFriendDetails;
