import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { Octicons } from "@expo/vector-icons";

interface Props {
  title: string;
  action: () => void;
}

const AdderHeader: React.FC<Props> = ({ title, action }) => {
  return (
    <View className="w-full flex flex-row justify-between items-center">
      <Text style={[globalStyles.semibold_text, { fontSize: 18 }]}>
        {title}
      </Text>
      <Octicons name="plus" size={26} color="black" onPress={action} />
    </View>
  );
};

export default AdderHeader;
