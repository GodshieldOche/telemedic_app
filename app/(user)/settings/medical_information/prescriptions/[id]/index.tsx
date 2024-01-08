import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CheckBox from "../../../../../../components/Formik/Checkbox";
import { globalStyles } from "../../../../../../constants/styles";
import { Iconify } from "react-native-iconify";
import DateList from "../../../../../../components/User/DateList";
import useAppDispatch, {
  useAppSelector,
} from "../../../../../../hooks/useDispatch";
import Loader from "../../../../../../components/Common/Loader";
import { getPrescription } from "../../../../../../redux/slices/user/medical_info/prescription";
import { router, useLocalSearchParams } from "expo-router";
import { partsoftheday } from "../../../../../../utils/data";
import PartofDayCard from "../../../../../../components/Common/PartofDayCard";

const index = () => {
  const { isDataLoading, data } = useAppSelector((state) => state.prescription);
  const dispatch = useAppDispatch();

  const { id: joinId } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    const id = joinId.split("+").pop() as string;

    if (!id) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getPrescription({ id: id, signal }));
    return () => {
      controller.abort();
    };
  }, [joinId]);

  if (isDataLoading || !data) {
    return <Loader />;
  }

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 space-y-10 ">
        <View className="px-4 " style={{ rowGap: 24 }}>
          <CheckBox
            name="prescription"
            label={
              <Text
                className="text-sm text-mainBlack"
                style={[globalStyles.semibold_text]}
              >
                Set Reminder
              </Text>
            }
            errors={""}
            handleChange={() => {}}
            value={false}
            touched={false}
            handleBlur={() => {}}
          />
          <View className="bg-primaryGray px-4 py-3 w-full rounded-md  ">
            <Pressable
              onPress={() =>
                router.push(
                  `/(user)/settings/medical_information/prescriptions/${data.name}+${data.id}/details`
                )
              }
              className="bg-white rounded-lg px-4 py-3 flex-row justify-between items-center  "
            >
              <Text
                className="text-base text-[#494949] "
                style={[globalStyles.semibold_text]}
              >
                {data?.name}
              </Text>
              <Iconify
                icon="ic:round-chevron-right"
                size={24}
                color="#2B2B2B"
              />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            rowGap: 24,
          }}
        >
          <DateList start_date={data.start_date} end_date={data.end_date} />
          <View
            className="px-4"
            style={{
              rowGap: 36,
            }}
          >
            {[...data.time_segments]
              .sort(
                (a, b) =>
                  new Date(b.time).getTime() - new Date(a.time).getTime()
              )
              .map(({ part_of_day, time, quantity }, index) => {
                const partoftheday =
                  partsoftheday[part_of_day as keyof typeof partsoftheday];
                return (
                  <PartofDayCard
                    key={index}
                    icon={partoftheday.icon}
                    part_of_day={part_of_day}
                    time={time}
                    quantity={quantity}
                  />
                );
              })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default index;
