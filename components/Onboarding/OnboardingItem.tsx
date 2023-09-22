import { View, useWindowDimensions, Image } from "react-native";
import React from "react";

interface Props {
  item: { id: string; title: string; description: string; image: any };
}

const OnboardingItem: React.FC<Props> = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View className="" style={{ width, flex: 1 }}>
      <Image source={item.image} style={{ width, flex: 0.6 }} />
    </View>
  );
};

export default OnboardingItem;
