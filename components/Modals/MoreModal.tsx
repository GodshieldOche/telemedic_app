import { View, Modal, Pressable } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Service } from "../../utils/interface";
import IconText from "../Common/IconText";
import { Iconify } from "react-native-iconify";

type Props = {
  modalVisible: boolean;
  closeModal: () => void;
  action: () => void;
  loading: boolean;
  services: Service[];
};

const MoreModal: React.FC<Props> = ({
  modalVisible,
  closeModal,
  action,
  loading,
  services,
}) => {
  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <View className="flex-1 relative bg-mainBlack/30 ">
        <View className=" absolute bottom-0 left-0 h-[80%] right-0 py-4 space-y-4 bg-white  flex-1">
          <View className="flex-row justify-end px-7">
            <Pressable onPress={closeModal} className="">
              <Iconify icon="heroicons-outline:x" size={24} color="#E1604D" />
            </Pressable>
          </View>
          <ScrollView className="flex-1 py-6 ">
            <View className="flex-1 pb-12">
              <FlatList
                data={services}
                renderItem={({ item, index }) => (
                  <IconText
                    icon={item.icon}
                    text={item.text}
                    route={item.route}
                    iconContainerStyles={item.iconContainerStyles}
                    params={item.params}
                    key={index}
                  />
                )}
                numColumns={4}
                contentContainerStyle={{
                  gap: 12,
                  paddingHorizontal: 16,
                }}
                scrollEnabled={false}
                columnWrapperStyle={{
                  gap: 12,
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MoreModal;
