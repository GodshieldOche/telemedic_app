import { View, Text, Modal, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { Iconify } from "react-native-iconify";
import { globalStyles } from "../../constants/styles";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
  modalVisible: boolean;
  closeModal: () => void;
  clearAll: () => void;
  children: React.ReactNode;
};

const Filter: React.FC<Props> = ({
  modalVisible,
  closeModal,
  clearAll,
  children,
}) => {
  return (
    <Modal visible={modalVisible} animationType="slide">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row relative px-4 py-3  justify-between items-center ">
          <View className="absolute top-0 left-0  right-0 bottom-0 justify-center items-center">
            <Text
              className="text-lg text-mainBlack "
              style={[globalStyles.semibold_text]}
            >
              Filter
            </Text>
          </View>
          <Pressable onPress={closeModal}>
            <Iconify
              icon="ic:round-cancel"
              onPress={closeModal}
              color="#2B2B2B"
              size={24}
            />
          </Pressable>
          <Pressable onPress={clearAll}>
            <Text
              className="text-lg text-primaryOne  "
              style={[globalStyles.semibold_text]}
            >
              Clear All
            </Text>
          </Pressable>
        </View>

        {/* Body */}
        <ScrollView className="py-5 flex-1">{children}</ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default Filter;
