import { Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useAppSelector } from "../../../hooks/useDispatch";
import Loader from "../../../components/Common/Loader";
import { globalStyles } from "../../../constants/styles";
import InfoTextBox from "../../../components/Common/InfoTextBox";
import Button from "../../../components/Common/Button";
import { router } from "expo-router";

const CreateAccountFacility = () => {
  const { loading } = useAppSelector((state) => state.facilityCategory);
  const { files, data } = useAppSelector((state) => state.practitionerRegister);

  if (loading) {
    return <Loader />;
  }
  const first_check: boolean = files.kyc_image;
  const second_check: boolean =
    data.nin || files.international_passport || files.driving_licence;

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4 space-y-10">
        <View className="flex justify-center px-5 items-center space-y-2">
          <Text className="text-2xl" style={[globalStyles.semibold_text]}>
            Weldone! You are almost done
          </Text>
          <Text
            className="text-center text-sm "
            style={[globalStyles.regular_text]}
          >
            To complete registration you have to take a selfie and upload a
            document for user verification
          </Text>
        </View>
        <View
          className="px-4 py-5 bg-primaryGray rounded-lg "
          style={{
            rowGap: 16,
          }}
        >
          <InfoTextBox
            text="Take a Selfie"
            action={() => router.push("/practitioner/selfie")}
            checked={first_check}
          />
          <InfoTextBox
            text="Upload Document"
            action={() => router.push("/(auth)/practitioner/options")}
            checked={second_check}
          />
        </View>
        <View className="!mt-20">
          <Button
            text="Finish"
            disabled={!first_check || !second_check}
            action={() => ""}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateAccountFacility;

// sudo certbot certonly --nginx -d apis.trustfynd.com -d www.apis.trustfynd.com
