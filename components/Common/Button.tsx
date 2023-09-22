import { Text, Pressable, ActivityIndicator, Platform } from "react-native";
import React from "react";

interface Props {
  text: string;
  action: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  text,
  action,
  loading = false,
  disabled = false,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          width: "100%",
          alignItems: "center",
          borderRadius: 8,
          paddingVertical: 14,
          backgroundColor: pressed ? "#CACOFF" : "#8863F2",
        },
      ]}
      onPress={action}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          style={{
            paddingVertical: Platform.OS === "ios" ? 4 : 1.5,
          }}
          color="#fff"
        />
      ) : (
        <Text
          className="text-lg text-white font-normal"
          style={{
            fontFamily: "Nunito_Meduim",
          }}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
