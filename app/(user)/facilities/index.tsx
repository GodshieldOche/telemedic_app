import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getFacilities } from "../../../redux/slices/app/facilities";
import { Categorish, Resource, Service } from "../../../utils/interface";
import useAppDispatch from "../../../hooks/useDispatch";
import { getFacilityCategories } from "../../../redux/slices/app/facility_category";
import { icons } from "../../../utils/data";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import SearchInput from "../../../components/Common/SearchInput";
import IconText from "../../../components/Common/IconText";
import ViewCard from "../../../components/Common/ViewCard";
import NoRecordFound from "../../../components/Common/NoRecordFound";

const FacilitiesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setServices([]);
    setResources([]);
    dispatch(getFacilities({})).then(({ payload }: { payload: Resource[] }) => {
      setResources(payload);
    });
    dispatch(getFacilityCategories()).then(
      ({ payload }: { payload: Categorish[] }) => {
        payload.forEach((catgory) => {
          const icon = icons[catgory.name]?.icon || icons["Default"].icon;
          const iconContainerStyles =
            icons[catgory.name]?.styles || icons["Default"].styles;
          setServices((prev) => [
            ...prev,
            {
              text: catgory.name,
              icon,
              route:
                `/(user)/facilities/category/${catgory.name}+${catgory.id}` as Service["route"],
              iconContainerStyles,
            },
          ]);
        });
      }
    );
  }, []);
  return (
    <View className="flex-1 py-4 bg-white">
      <View
        className="flex-1"
        style={{
          rowGap: 16,
        }}
      >
        <View
          style={{
            rowGap: 24,
          }}
        >
          <View className="px-4">
            <SearchInput />
          </View>
          <FlatList
            data={services}
            renderItem={({ item, index }) => (
              <IconText
                icon={item.icon}
                text={item.text}
                route={item.route}
                iconContainerStyles={item.iconContainerStyles}
                key={index}
              />
            )}
            horizontal
            contentContainerStyle={{
              columnGap: 8,
              paddingHorizontal: 8,
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <ScrollView className="py-2 flex-1">
          {resources.length === 0 ? (
            <NoRecordFound />
          ) : (
            <View className="px-4">
              <FlatList
                data={resources}
                renderItem={({ item, index }) => (
                  <ViewCard
                    resource={item}
                    key={index}
                    isLastItem={index === resources.length - 1}
                    isOddTotal={resources.length % 2 !== 0}
                  />
                )}
                numColumns={2}
                columnWrapperStyle={{
                  columnGap: 16,
                }}
                contentContainerStyle={{
                  rowGap: 16,
                  paddingBottom: 36,
                }}
                scrollEnabled={false}
                horizontal={false}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default FacilitiesPage;
