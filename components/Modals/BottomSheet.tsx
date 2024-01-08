import { View, Modal, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { Iconify } from "react-native-iconify";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  modalVisible: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

const BottomSheet: React.FC<Props> = ({
  modalVisible,
  closeModal,
  children,
}) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <SafeAreaView className="flex-1 relative bg-mainBlack/30">
        <View
          className="absolute bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-[40px]  px-4 pt-14"
          style={{
            paddingBottom: bottom,
          }}
        >
          {children}
          <Pressable onPress={closeModal} className="absolute top-3 right-7">
            <Iconify icon="heroicons-outline:x" size={24} color="#E1604D" />
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default BottomSheet;
