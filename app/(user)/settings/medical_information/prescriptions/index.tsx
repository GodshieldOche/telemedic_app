import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import EmptyButtonView from "../../../../../components/Common/EmptyButtonView";
import useAppDispatch, {
  useAppSelector,
} from "../../../../../hooks/useDispatch";
import Loader from "../../../../../components/Common/Loader";
import { router } from "expo-router";
import { Iconify } from "react-native-iconify";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../../../constants/styles";
import { getDateRange, getMonthYear } from "../../../../../utils/helper";
import {
  deletePrescription,
  getPrescriptions,
} from "../../../../../redux/slices/user/medical_info/prescription";
import HeaderSwitch from "../../../../../components/Common/HeaderSwitch";
import moment from "moment";

const values = [
  { name: "Doctor's Medication", value: "practitioner" },
  { name: "My Medication", value: "user" },
];

const Prescriptions = () => {
  const { list, isListLoading } = useAppSelector((state) => state.prescription);
  const [active, toggleActive] = React.useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getPrescriptions(signal));

    return () => {
      controller.abort();
    };
  }, []);

  if (isListLoading) {
    return <Loader />;
  }

  const handlePushToAdd = () => {
    router.push("/(user)/settings/medical_information/prescriptions/new");
  };

  const handlePushToEdit = (id: string, name: string) => {
    router.push(
      `/(user)/settings/medical_information/prescriptions/${name}+${id}/`
    );
  };

  const handleDelete = (id: string) => {
    dispatch(deletePrescription(id));
  };

  const activeTab = values[active ? 1 : 0].value;

  return (
    <View
      className="flex-1  py-4  bg-white"
      style={{
        rowGap: 24,
      }}
    >
      <HeaderSwitch
        values={values}
        active={active}
        handlePress={() => toggleActive(!active)}
      />

      {list.filter((l) => l.created_by === activeTab).length < 1 ? (
        <EmptyButtonView
          title={
            activeTab === "practitioner"
              ? "You don't have any Doctor's Prescription"
              : "You are yet to add a Prescription"
          }
          text="New Prescription"
          action={handlePushToAdd}
          hideAddButton={activeTab === "practitioner"}
        />
      ) : (
        <View className="flex-1">
          <View className="flex-row justify-end pb-2 px-4">
            <Iconify
              icon="mingcute:add-fill"
              size={24}
              color="#2B2B2B"
              onPress={handlePushToAdd}
            />
          </View>
          <ScrollView className="px-4 space-y-4 py-2">
            {list.map((item, index) => (
              <View
                className="flex flex-row justify-between items-start py-4 px-4 bg-primaryGray  rounded-lg"
                key={index}
              >
                <View className="space-y-[18px]">
                  <Text
                    className="text-mainBlack"
                    style={[globalStyles.semibold_text, { fontSize: 16 }]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    className="text-secondaryGray"
                    style={[
                      globalStyles.regular_text,
                      {
                        fontSize: 13,
                      },
                    ]}
                  >
                    {getDateRange(item.start_date, item.end_date)}
                  </Text>
                </View>
                <View
                  className="flex-row items-center"
                  style={{ columnGap: 16 }}
                >
                  <Pressable
                    onPress={() => handlePushToEdit(item.id!, item.name)}
                  >
                    <Iconify icon="tdesign:edit-2" size={24} color="#2B2B2B" />
                  </Pressable>
                  <Pressable onPress={() => handleDelete(item.id!)}>
                    <Iconify
                      icon="ri:delete-bin-6-line"
                      size={24}
                      color="#2B2B2B"
                    />
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Prescriptions;
