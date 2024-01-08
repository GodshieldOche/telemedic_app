import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import Button from "../../../../components/Common/Button";
import { globalStyles } from "../../../../constants/styles";
import InfoSensitiveModal from "../../../../components/Modals/InfoSensitive";
import { ScrollView } from "react-native-gesture-handler";
import { deleteSecure } from "../../../../utils/helper";
import { router } from "expo-router";
import useAppDispatch from "../../../../hooks/useDispatch";
import { messageAlert } from "../../../../components/Common/Alerts";
import { deletePractitionerAccount } from "../../../../redux/slices/practitioner/account";

const DeleteAccount = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleDeleteAccount = async () => {
    setLoading(true);
    const res = await dispatch(deletePractitionerAccount());
    if (res.error) {
      messageAlert(
        "Error",
        (res?.payload && res?.payload[0]?.error) || "Something went wrong"
      );
      return setLoading(false);
    }

    // handle logout
    await deleteSecure("practitionerToken");
    setLoading(false);
    setModalVisible(false);
    router.replace("/(auth)/");
  };
  return (
    <View className="flex-1  bg-white">
      <ScrollView className="flex-1  px-4 ">
        <View className=" h-full w-full py-8 items-center space-y-16 px-4 ">
          <Image
            source={require("../../../../assets/images/delete_account.png")}
            className="w-[290px] h-[170px] "
            alt="Delete Account"
          />
          <View
            className="w-full"
            style={{
              rowGap: 58,
            }}
          >
            <View className="w-full items-center space-y-4">
              <Text
                className="text-center text-sm text-[#E1604D] "
                style={[globalStyles.semibold_text]}
              >
                Request Deactivate/Delete Account
              </Text>
              <Text
                className="text-center text-[#9DA0A4] "
                style={[globalStyles.meduim_text]}
              >
                Are you sure that you want to delete or deactivate your account?
                This decision cannot be reversed.
              </Text>
            </View>
            <Button
              text="Request Deactivate Account"
              action={() => setModalVisible(true)}
              loading={false}
              styles={{
                backgroundColor: "#E1604D",
              }}
            />
          </View>
        </View>
      </ScrollView>
      <InfoSensitiveModal
        closeModal={() => setModalVisible(false)}
        action={handleDeleteAccount}
        modalVisible={modalVisible}
        loading={loading}
        question="Are You Sure?"
        closeButtonText="No. Go Back"
        actionButtonText="Yes, Send Request"
      />
    </View>
  );
};

export default DeleteAccount;
