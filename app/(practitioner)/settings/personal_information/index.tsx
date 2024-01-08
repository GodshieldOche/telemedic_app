import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../../../components/Common/Button";
import { globalStyles } from "../../../../constants/styles";
import { useAppSelector } from "../../../../hooks/useDispatch";
import { router } from "expo-router";
import { truncate } from "lodash";

const PersonalInformation = () => {
  const data = useAppSelector((state) => state.practitionerProfile).data!;
  return (
    <View className="flex-1 bg-white">
      <ScrollView className=" py-6 px-4  flex-1">
        <View className="space-y-6">
          <View className="flex-row justify-end">
            <View className="w-1/2">
              <Button
                text="Edit Profile"
                textStyles={{
                  fontSize: 14,
                }}
                styles={{
                  paddingVertical: 9,
                }}
                action={() =>
                  router.push(
                    "/(practitioner)/settings/personal_information/edit"
                  )
                }
              />
            </View>
          </View>
          <View className="px-[14px] py-5 bg-primaryGray rounded-lg ">
            <View className="bg-white py-6 px-3 " style={{ rowGap: 24 }}>
              <TitleValue
                title="First Name"
                value={data.first_name.toCapitalized()}
              />
              <TitleValue
                title="Last Name"
                value={data.last_name.toCapitalized()}
              />
              <TitleValue title="Email" value={data.email} />
              <TitleValue
                title="Phone No"
                value={`${data.phone_code} ${data.phone_no}`}
              />
              <TitleValue
                title="Description"
                value={`${truncate(data.description, { length: 24 })}`}
              />
              <TitleValue
                title="Country"
                value={`${truncate(data.address.country.name, { length: 24 })}`}
              />
              <TitleValue
                title="State"
                value={`${truncate(data.address.state.name, { length: 24 })}`}
              />
              <TitleValue
                title="City"
                value={`${truncate(data.address.city.name, { length: 24 })}`}
              />
              <TitleValue
                title="Postal Code"
                value={`${truncate(data.address.postal_code, { length: 24 })}`}
              />
              <TitleValue
                title="Address"
                value={`${truncate(data.address.street_line_one, {
                  length: 24,
                })}`}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalInformation;

const TitleValue: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <View className="w-full flex-row justify-between items-center ">
      <Text
        className="text-base text-mainBlack"
        style={[globalStyles.regular_text]}
      >
        {title}
      </Text>
      <Text
        className="text-base max-w-[50%] text-mainBlack"
        style={[globalStyles.meduim_text]}
      >
        {value}
      </Text>
    </View>
  );
};
