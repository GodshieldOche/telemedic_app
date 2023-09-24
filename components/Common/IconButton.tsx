import { ActivityIndicator, Platform, Pressable } from "react-native";
import React from "react";

interface Props {
  action: () => void;
  SVG: any;
  loading?: boolean;
}

const IconButton: React.FC<Props> = ({ action, SVG, loading = false }) => {
  return (
    <Pressable
      onPress={action}
      className="w-14 h-14 bg-primaryOne justify-center items-center rounded-full "
    >
      {loading ? <ActivityIndicator size="small" color="#fff" /> : SVG}
    </Pressable>
  );
};

export default IconButton;
