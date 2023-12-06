import { View, Text, Image } from "react-native";
import React from "react";
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
              className="flex-1 w-full"
              style={{ width: "100%", height: 180 }}
              key={item.id}
            >
              <Image
                source={{ uri: item.url }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
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

export default Photos;
