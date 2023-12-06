import { View, Animated, useWindowDimensions } from "react-native";
import React from "react";

interface Props {
  data: any[];
  scrollX: Animated.Value;
  backgroundColor?: string;
  range?: number[];
  height?: number;
}

const Paginator: React.FC<Props> = ({
  data,
  scrollX,
  range = [19, 37, 19],
  backgroundColor = "#8863F2",
  height = 5,
}) => {
  const { width } = useWindowDimensions();
  return (
    <View className="flex flex-row gap-x-2 h-auto ">
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dothWidth = scrollX.interpolate({
          inputRange,
          outputRange: range,
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            className=" rounded-[5px] "
            style={{ width: dothWidth, opacity, backgroundColor, height }}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;
