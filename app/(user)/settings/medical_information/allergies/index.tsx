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
import { getMonthYear } from "../../../../../utils/helper";
import {
  deleteAllergy,
  getAllergies,
} from "../../../../../redux/slices/user/medical_info/allergy";

const Allergy = () => {
  const { list, isListLoading } = useAppSelector((state) => state.allergy);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getAllergies(signal));

    return () => {
      controller.abort();
    };
  }, []);

  if (isListLoading) {
    return <Loader />;
  }

  const handlePushToAdd = () => {
    router.push("/(user)/settings/medical_information/allergies/new");
  };

  const handlePushToEdit = (id: string) => {
    router.push(`/(user)/settings/medical_information/allergies/${id}`);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteAllergy(id));
  };

  return (
    <View
      className="flex-1  py-4  bg-white"
      style={{
        rowGap: 24,
      }}
    >
      {list.length < 1 ? (
        <EmptyButtonView
          title="You don not have any Allergy listed"
          text="Add Allergy"
          action={handlePushToAdd}
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
                    {item.agent}
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
                    {item.reactions.join(", ")}
                  </Text>
                </View>
                <View
                  className="flex-row items-center"
                  style={{ columnGap: 16 }}
                >
                  <Pressable onPress={() => handlePushToEdit(item.id!)}>
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

export default Allergy;
