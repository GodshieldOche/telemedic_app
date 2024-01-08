import { View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "../../../../../../hooks/useDispatch";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../../../../constants/styles";
import { Stack, router } from "expo-router";
import moment from "moment";
import { Image } from "expo-image";
import { Iconify } from "react-native-iconify";

const Details = () => {
  const { data } = useAppSelector((state) => state.prescription);

  if (!data) {
    return router.back();
  }

  return (
    <ScrollView className="bg-white  flex-1">
      {data.created_by === "user" && (
        <Stack.Screen
          options={{
            headerRight: () => {
              return (
                <Iconify
                  icon="mdi:pencil"
                  color="#8863F2"
                  size={24}
                  onPress={() =>
                    router.push(
                      `/(user)/settings/medical_information/prescriptions/${data.name}+${data.id}/edit`
                    )
                  }
                />
              );
            },
          }}
        />
      )}

      <View className="py-6 space-y-5 px-4 ">
        <View className="pt-3 pb-11 px-4 w-full bg-primaryGray space-y-5 rounded-[5px] ">
          <View className=" bg-white rounded-lg ">
            <View
              className="py-5 px-4"
              style={{
                rowGap: 16,
              }}
            >
              <Image
                source={data?.media?.url}
                contentFit="contain"
                className="w-full h-[200px] rounded-lg"
                placeholder={data.media?.blur_hash}
              />
              <TitleValue title="Medication" value={data?.medication?.name!} />
              <TitleValue title="Name" value={data?.name!} />
              <TitleValue
                title="Duration"
                value={`${moment(data?.start_date).format("L")} - ${moment(
                  data?.end_date
                ).format("L")}`}
              />
            </View>
            <View className="w-full !border-t-[0.5px] border-borderGray px-4 py-5">
              <TitleValue
                title="Parts of the day"
                value={[...data.time_segments]
                  .sort(
                    (a, b) =>
                      new Date(b.time).getTime() - new Date(a.time).getTime()
                  )
                  .map((segment) => segment.part_of_day)
                  .join(", ")}
              />
            </View>
          </View>
          <View className=" bg-white rounded-lg px-4 py-3 ">
            <TitleValue
              title="Description"
              value={data.description}
              rowGap={8}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;

const TitleValue: React.FC<{
  title: string;
  value: string;
  rowGap?: number;
}> = ({ title, value, rowGap = 0 }) => {
  return (
    <View
      style={{
        rowGap,
      }}
    >
      <Text
        className="text-[13px] text-darkGray  "
        style={[globalStyles.regular_text]}
      >
        {title}
      </Text>
      <Text
        className="text-base text-darkGray"
        style={[globalStyles.semibold_text]}
      >
        {value}
      </Text>
    </View>
  );
};
