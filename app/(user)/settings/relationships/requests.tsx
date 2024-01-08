import { View, Text } from "react-native";
import React, { useEffect } from "react";
import SearchInput from "../../../../components/Common/SearchInput";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import {
  acceptRelationshipRequest,
  deleteRelationship,
  getFamilyAndFriendsRequests,
  postAddAddFamilyAndFriend,
} from "../../../../redux/slices/user/relationship";
import Loader from "../../../../components/Common/Loader";
import { ScrollView } from "react-native-gesture-handler";
import ContactCard from "../../../../components/Common/ContactCard";
import { globalStyles } from "../../../../constants/styles";
import Button from "../../../../components/Common/Button";
import BottomSheet from "../../../../components/Modals/BottomSheet";
import { messageAlert } from "../../../../components/Common/Alerts";
import { router } from "expo-router";
import { Relationship } from "../../../../utils/interface";
import EmptyButtonView from "../../../../components/Common/EmptyButtonView";
import ImageSvg from "../../../../components/Common/ImageSvg";
import CheckBox from "../../../../components/Formik/Checkbox";

const ContactRequests = () => {
  const [query, setQuery] = React.useState<string>("");
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [canViewEHR, setCanViewEHR] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<Relationship>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isDeclineLoading, setDeclineLoading] = React.useState<boolean>(false);

  const {
    requests: { list },
    isRequestLoading,
  } = useAppSelector((state) => state.relationship);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getFamilyAndFriendsRequests({ signal, query }));

    return () => {
      controller.abort();
    };
  }, [query]);

  const handleAcceptRequest = async () => {
    const body = {
      can_view_ehr: canViewEHR,
    };
    setLoading(true);
    const res = await dispatch(
      acceptRelationshipRequest({ body, id: selected?.id! })
    );

    if (res.error) {
      messageAlert(
        "Error",
        (res?.payload && res?.payload[0]?.error) || "Something went wrong"
      );
      return setLoading(false);
    }

    setLoading(false);
    setModalVisible(false);
    router.push("/(user)/settings/relationships");
  };

  const handleDeclineRequest = async () => {
    setDeclineLoading(true);
    const res = await dispatch(deleteRelationship(selected?.id!));

    if (res.error) {
      messageAlert(
        "Error",
        (res?.payload && res?.payload[0]?.error) || "Something went wrong"
      );
      return setDeclineLoading(false);
    }

    setDeclineLoading(false);
    setModalVisible(false);
    router.push("/(user)/settings/relationships");
  };

  return (
    <View className="flex-1 bg-white py-3">
      {isRequestLoading ? (
        <Loader />
      ) : list.length < 1 ? (
        <EmptyButtonView
          title="You don't have any pending Family & Friends requests"
          text="Go To Family & Friends"
          action={() => router.back()}
        />
      ) : (
        <View className="flex-1  space-y-3">
          <View className="px-4">
            <SearchInput
              placholder="Search by Name or Email address"
              setQuery={setQuery}
              hideFilter
            />
          </View>
          <View className="flex-1 space-y-2 ">
            <Text
              className="text-base text-mainBlack px-4"
              style={[globalStyles.semibold_text]}
            >
              Contact Requests
            </Text>

            <ScrollView className="px-4">
              <View className="py-3" style={{ rowGap: 12 }}>
                {list.map((contact) => (
                  <ContactCard
                    {...contact}
                    component={
                      <View>
                        <Button
                          text="View"
                          styles={{ width: 85, paddingVertical: 6 }}
                          textStyles={{ fontSize: 13 }}
                          action={() => {
                            setSelected(contact);
                            setCanViewEHR(false);
                            setModalVisible(true);
                          }}
                        />
                      </View>
                    }
                    key={contact.id}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      )}

      {/* Bottom Sheet Modal */}
      <BottomSheet
        modalVisible={modalVisible && selected !== undefined}
        closeModal={() => {
          setModalVisible(false);
          setSelected(undefined);
          setCanViewEHR(false);
        }}
      >
        <View className="px-[19px] pb-6 bg-primaryGray divide-y divide-borderGray rounded-lg ">
          <View className="space-y-[14px] py-6">
            <View className="justify-center items-center ">
              <ImageSvg
                url={selected?.display_image!}
                style={{
                  width: 56,
                  height: 56,
                }}
              />
            </View>
            <Text
              className="text-base text-mainBlack text-center "
              style={[globalStyles.semibold_text]}
            >
              {selected?.first_name} {selected?.last_name} is requesting you as
              a Brother on their Medicare Contact
            </Text>
          </View>
          <View className="py-6" style={{ rowGap: 16 }}>
            <CheckBox
              name="can_view_ehr"
              label={
                <Text
                  className="text-sm text-mainBlack"
                  style={[globalStyles.semibold_text]}
                >
                  Allow this Contact access to your EHR
                </Text>
              }
              errors={""}
              handleChange={(_: string, value: boolean) => setCanViewEHR(value)}
              value={canViewEHR}
              touched={false}
              handleBlur={() => {}}
            />
            <Button
              text="Accept Request"
              disabled={!selected}
              loading={isLoading}
              action={handleAcceptRequest}
            />
          </View>
          <View className="py-6">
            <Button
              text="Decline Request"
              loading={isDeclineLoading}
              action={handleDeclineRequest}
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
      </BottomSheet>
    </View>
  );
};

export default ContactRequests;
