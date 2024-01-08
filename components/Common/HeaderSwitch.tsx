import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { globalStyles } from "../../constants/styles";

type Props = {
  values: { name: string; value: string }[];
  active: boolean;
  handlePress: () => void;
};

const HeaderSwitch: React.FC<Props> = ({ values, active, handlePress }) => {
  const { width } = useWindowDimensions();

  const center = (width - 64) / 2;
  const marginLeft = useRef(new Animated.Value(center)).current;

  useEffect(() => {
    if (active) {
      Animated.timing(marginLeft, {
        toValue: center,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(marginLeft, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  }, [active]);

  return (
    <View className="px-4">
      <Pressable
        onPress={handlePress}
        className="py-2 px-4 rounded-full relative flex-row justify-between  bg-primaryGray"
      >
        <View className={` absolute px-4 py-2 left-0 top-0 bottom-0 right-0 `}>
          <Animated.View
            className=" w-[50%] py-[10px] rounded-full h-full bg-mainBlack "
            style={{
              marginLeft,
            }}
          ></Animated.View>
        </View>
        {values.map((item) => (
          <View
            key={item.value}
            className={`py-[10px]  transition-all ease-in delay-500 w-[50%] justify-center rounded-full items-center
                bg-transparent`}
          >
            <Text
              className={`${
                values[active ? 1 : 0].value === item.value
                  ? "text-white"
                  : "text-mainGray"
              } text-sm text-center `}
              style={[globalStyles.semibold_text]}
            >
              {item.name}
            </Text>
          </View>
        ))}
      </Pressable>
    </View>
  );
};

export default HeaderSwitch;
