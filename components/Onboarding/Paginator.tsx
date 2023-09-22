import { View, Animated, useWindowDimensions } from "react-native";
import React from "react";

interface Props {
  data: { id: string; title: string; description: string; image: any }[];
  scrollX: Animated.Value;
}

const Paginator: React.FC<Props> = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  return (
    <View className="flex flex-row gap-x-2 h-auto ">
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dothWidth = scrollX.interpolate({
          inputRange,
          outputRange: [19, 37, 19],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            className="h-[5px] rounded-[5px] bg-primaryOne "
            style={{ width: dothWidth, opacity }}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;
