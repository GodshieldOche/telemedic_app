import { View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { FlatList } from "react-native-gesture-handler";
import { Media } from "../../../utils/interface";

interface Props {
  values: Media[];
}

const Photos: React.FC<Props> = ({ values }) => {
  return (
    <View className="px-4">
      {values.length > 0 && (
        <FlatList
          data={values}
          renderItem={({ item }) => (
            <View
              className="flex-1 w-full bg-primaryGray py-3"
              style={{ width: "100%", height: 200 }}
              key={item.id}
            >
              <Image
                source={item.url}
                contentFit="contain"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                placeholder={item.blur_hash}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            rowGap: 16,
          }}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

export default Photos;
