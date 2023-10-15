import { View, Dimensions } from "react-native";
import React from "react";
import IconButton from "./IconButton";
import { Path, Svg } from "react-native-svg";

interface Props {
  action: () => void;
}

const NextButton: React.FC<Props> = ({ action }) => {
  return (
    <View
      className=" w-full flex-row justify-end"
      style={{
        position: "fixed",
        top: Dimensions.get("screen").height - 900,
      }}
    >
      <IconButton
        SVG={
          <Svg width="28" height="28" color="#fff" viewBox="0 0 24 24">
            <Path
              fill="currentColor"
              d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"
            />
          </Svg>
        }
        action={action}
      />
    </View>
  );
};

export default NextButton;
