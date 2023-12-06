import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { Iconify } from "react-native-iconify";

interface Props {
  title: string;
  action: () => void;
  isPlain?: boolean;
}

const AdderHeader: React.FC<Props> = ({ title, action, isPlain }) => {
  return (
    <View className="w-full flex flex-row justify-between items-center">
      <Text style={[globalStyles.semibold_text, globalStyles.normal_text]}>
        {title}
      </Text>
      {isPlain ? (
        <Iconify icon="tabler:edit" size={20} color="black" onPress={action} />
      ) : (
        <Octicons name="plus" size={24} color="black" onPress={action} />
      )}
    </View>
  );
};

export default AdderHeader;
