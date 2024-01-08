import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import EmptyButtonView from "../../../../components/Common/EmptyButtonView";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import Loader from "../../../../components/Common/Loader";
import { router } from "expo-router";
import { Iconify } from "react-native-iconify";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../../constants/styles";
import {
  deleteAddress,
  getAddresses,
} from "../../../../redux/slices/user/address";
import { messageAlert } from "../../../../components/Common/Alerts";

const ShippingInformation = () => {
  const { list, isListLoading } = useAppSelector((state) => state.userAddress);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getAddresses(signal));

    return () => {
      controller.abort();
    };
  }, []);

  if (isListLoading) {
    return <Loader />;
  }

  const handlePushToAdd = () => {
    router.push("/(user)/settings/shipping_information/new");
  };

  const handlePushToEdit = (id: string) => {
    router.push(`/(user)/settings/shipping_information/${id}`);
  };

  const handleDelete = async (id: string) => {
    const response = await dispatch(deleteAddress(id));

    if (response.error) {
      messageAlert(
        "Error",
        (response?.payload && response?.payload[0]?.error) ||
          "Something went wrong"
      );
      return;
    }
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
          title="You don not have any Address listed"
          text="Add Address"
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
                <View className="space-y-3 w-auto max-w-[70%] ">
                  <Text
                    className="text-mainBlack  "
                    style={[globalStyles.semibold_text, { fontSize: 16 }]}
                  >
                    {item.first_name} {item.last_name}
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
                    {item.street_line_one}, {item.city.name}, {item.state.name}.
                  </Text>
                  {/* If default */}
                  {item.is_default && (
                    <View className="flex-row items-center space-x-2">
                      <Iconify
                        icon="tabler:info-circle"
                        size={16}
                        color="#B95000"
                      />
                      <Text
                        className="text-info"
                        style={[
                          globalStyles.regular_text,
                          {
                            fontSize: 13,
                          },
                        ]}
                      >
                        Default Address
                      </Text>
                    </View>
                  )}
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

export default ShippingInformation;
