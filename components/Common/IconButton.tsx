import { ActivityIndicator, Platform, Pressable } from "react-native";
import React from "react";

interface Props {
  action: () => void;
  SVG: any;
  loading?: boolean;
  disabled?: boolean;
}

const IconButton: React.FC<Props> = ({
  action,
  SVG,
  loading = false,
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={action}
      disabled={disabled}
      className="w-14 h-14  justify-center items-center rounded-full "
      style={{
        backgroundColor: disabled ? "#E5DFFF" : "#8863F2",
      }}
    >
      {loading ? <ActivityIndicator size="small" color="#fff" /> : SVG}
    </Pressable>
  );
};

export default IconButton;
