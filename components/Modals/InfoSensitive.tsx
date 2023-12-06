import { View, Text, Modal, Image } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import Button from "../Common/Button";

type Props = {
  modalVisible: boolean;
  closeModal: () => void;
  action: () => void;
  loading: boolean;
  question: string;
  closeButtonText: string;
  actionButtonText: string;
};

const InfoSensitiveModal: React.FC<Props> = ({
  modalVisible,
  closeModal,
  action,
  loading,
  question,
  closeButtonText,
  actionButtonText,
}) => {
  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-secondarySeven/30 ">
        <View className="px-8 bg-white pb-10 pt-6 w-full space-y-5 rounded-lg justify-center items-center ">
          <Image
            source={require("../../assets/images/logout.png")}
            className="w-[289px] h-[168px]  "
          />

          <View className="w-full items-center space-y-[18px]">
            <Text
              className="text-mainRed text-xl"
              style={[globalStyles.semibold_text]}
            >
              {question}
            </Text>
            <View
              className="w-full"
              style={{
                rowGap: 24,
              }}
            >
              <Button
                text={closeButtonText}
                action={closeModal}
                styles={{
                  backgroundColor: "transparent",
                  borderColor: "#E1604D",
                  borderWidth: 2,
                  width: "100%",
                }}
                textStyles={{
                  color: "#E1604D",
                }}
              />
              <Button
                text={actionButtonText}
                action={action}
                loading={loading}
                styles={{
                  backgroundColor: "#E1604D",
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InfoSensitiveModal;
