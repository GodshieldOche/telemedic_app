import { View, Text, Image } from "react-native";
import React from "react";
import { Media } from "../../../utils/interface";
import { FlatList } from "react-native-gesture-handler";
import { ResizeMode, Video } from "expo-av";

interface Props {
  values: Media[];
}

const Videos: React.FC<Props> = ({ values }) => {
  return (
    <View className="px-4">
      {values.length > 0 && (
        <FlatList
          data={values}
          renderItem={({ item }) => (
            <View
              className="flex-1 w-full "
              style={{ width: "100%", height: 180 }}
              key={item.id}
            >
              <Video
                style={{ width: "100%", height: "100%" }}
                source={{
                  uri: item.url,
                }}
                useNativeControls={false}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay={false}
                posterSource={require("../../../assets/images/rainbow.png")}
                posterStyle={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
                // PosterComponent={({ source, style }) => (
                //   <Image source={source} style={style} />
                // )}
                usePoster
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            columnGap: 16,
          }}
          contentContainerStyle={{
            rowGap: 16,
          }}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

export default Videos;
