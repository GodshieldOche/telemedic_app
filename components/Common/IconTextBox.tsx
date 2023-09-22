import { View, Text, Pressable } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  action?: () => void;
}

const IconTextBox: React.FC<Props> = ({ title, action }) => {
  return (
    <Pressable
      onPress={action}
      style={{
        flexDirection: "row",
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8,
        cursor: "pointer",
      }}
    >
      <Text
        className="text-secondaryBlack"
        style={[globalStyles.semibold_text, { fontSize: 18 }]}
      >
        {title}
      </Text>
      <Ionicons name="md-arrow-forward-outline" size={20} color="#2B2B2B" />
    </Pressable>
  );
};

export default IconTextBox;
