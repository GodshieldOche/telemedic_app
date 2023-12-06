import { Text, View } from "react-native";
import React from "react";
import { Iconify } from "react-native-iconify";
import { globalStyles } from "../../../constants/styles";
import { FlatList } from "react-native-gesture-handler";
import ViewCard from "../../Common/ViewCard";
import { Resource } from "../../../utils/interface";

type Props = {
  resources: Resource[];
};

const List: React.FC<Props> = ({ resources }) => {
  return (
    <View
      className="px-4"
      style={{
        rowGap: 24,
      }}
    >
      <View className="flex flex-row justify-end">
        <View className="rounded-full flex flex-row px-3 py-2 bg-primaryGray space-x-3 ">
          <Iconify icon="icon-park:change" color="#000" size={18} />
          <Text className="text-[13px]" style={[globalStyles.regular_text]}>
            Recommended
          </Text>
        </View>
      </View>
      <FlatList
        data={resources}
        renderItem={({ item, index }) => (
          <ViewCard
            resource={item}
            isLastItem={index === resources.length - 1}
            isOddTotal={resources.length % 2 !== 0}
            key={item.id}
          />
        )}
        numColumns={2}
        columnWrapperStyle={{
          flex: 1,
          columnGap: 16,
        }}
        contentContainerStyle={{
          rowGap: 16,
          paddingBottom: 36,
        }}
        scrollEnabled={false}
      />
    </View>
  );
};

export default List;
