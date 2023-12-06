import { View, Text, Pressable, StyleProp, TextStyle } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  action?: () => void;
  style?: StyleProp<TextStyle>;
}

const IconTextBox: React.FC<Props> = ({ title, action, style }) => {
  return (
    <Pressable
      onPress={action}
      style={{
        flexDirection: "row",
        padding: 16,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8,
        cursor: "pointer",
      }}
    >
      <Text
        className="text-secondaryBlack"
        style={[globalStyles.semibold_text, { fontSize: 16 }]}
      >
        {title}
      </Text>
      <Ionicons name="md-arrow-forward-outline" size={18} color="#2B2B2B" />
    </Pressable>
  );
};

export default IconTextBox;
