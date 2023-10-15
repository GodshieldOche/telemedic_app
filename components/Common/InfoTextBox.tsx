import { Text, Pressable } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../constants/styles";

interface Props {
  text: string;
  action: () => void;
  checked?: boolean;
}

const InfoTextBox: React.FC<Props> = ({ text, action, checked = false }) => {
  return (
    <Pressable
      onPress={action}
      className="px-6 py-4 bg-white rounded-lg flex flex-row items-center justify-between"
    >
      <Text className="text-lg" style={[globalStyles.semibold_text]}>
        {text}
      </Text>
      {checked ? (
        <Ionicons name="checkmark-circle" size={26} color="#5EC376" />
      ) : (
        <MaterialIcons name="info" size={26} color="#D68E04" />
      )}
    </Pressable>
  );
};

export default InfoTextBox;
