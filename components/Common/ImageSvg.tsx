import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import { SvgUri } from "react-native-svg";
import { Image } from "expo-image";

type Props = {
  url: string;
  blurhash?: string;
  style: StyleProp<ViewStyle>;
};

const ImageSvg: React.FC<Props> = ({ style, blurhash, url }) => {
  return (
    <View className="rounded-full overflow-hidden" style={[style]}>
      {url.includes("svg") ? (
        <SvgUri uri={url} width={"100%"} height={"100%"} />
      ) : (
        <Image
          source={url}
          contentPosition="top"
          placeholder={blurhash}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 9999,
          }}
        />
      )}
    </View>
  );
};

export default ImageSvg;
