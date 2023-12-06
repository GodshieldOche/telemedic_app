import { Text, Pressable, View } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  value: string;
  action?: () => void;
}

const IconProfileBox: React.FC<Props> = ({ title, value, action }) => {
  return (
    <Pressable
      onPress={action}
      style={{
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8,
        cursor: "pointer",
        width: "100%",
      }}
    >
      <View className="space-y-[2px] w-[80%] ">
        <Text
          className="text-mainGray text-[13px]"
          style={[globalStyles.semibold_text]}
        >
          {title}:
        </Text>
        <Text
          className="text-mainBlack "
          style={[globalStyles.semibold_text, { fontSize: 16 }]}
        >
          {value}
        </Text>
      </View>
      <Ionicons name="md-arrow-forward-outline" size={18} color="#2B2B2B" />
    </Pressable>
  );
};

export default IconProfileBox;
