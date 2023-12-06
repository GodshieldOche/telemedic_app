import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import { Categorish, Service } from "../../../../utils/interface";
import { getFacilities } from "../../../../redux/slices/app/facilities";
import { getTypesOnFacilityCategory } from "../../../../redux/slices/app/facility_category";
import _ from "lodash";
import { icons } from "../../../../utils/data";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import SearchInput from "../../../../components/Common/SearchInput";
import IconText from "../../../../components/Common/IconText";
import ViewCard from "../../../../components/Common/ViewCard";
import Loader from "../../../../components/Common/Loader";

const FaciltityCategory = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { list } = useAppSelector((state) => state.facilities);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const actualId = id.split("+")[1];
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    dispatch(
      getFacilities({
        search_params: `facility_category_id=${actualId}`,
        signal,
      })
    );
    dispatch(getTypesOnFacilityCategory({ id: actualId, signal })).then(
      ({ payload }: { payload: Categorish[] }) => {
        const types = _.cloneDeep(payload);
        setServices([]);
        types?.forEach((catgory) => {
          const icon = icons[catgory.name]?.icon || icons["Default"].icon;
          const iconContainerStyles =
            icons[catgory.name]?.styles || icons["Default"].styles;
          setServices((prev) => [
            ...prev,
            {
              text: catgory.name,
              icon,
              route: "/",
              iconContainerStyles,
            },
          ]);
        });
        setLoading(false);
      }
    );

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  const more: Service = {
    text: "More",
    icon: icons["More"].icon,
    route: `/(user)/facilities/more`,
    iconContainerStyles: icons["More"].styles,
    params: {
      id: id.split("+")[1],
    },
  };
  return (
    <View className="flex-1 bg-white">
      <ScrollView className=" py-4  flex-1">
        <View
          className="flex-1"
          style={{
            flexDirection: "column",
            rowGap: 24,
            padding: 0,
            margin: 0,
          }}
        >
          <View className="px-4">
            <SearchInput />
          </View>
          <FlatList
            data={[
              ...services.slice(0, 3),
              more,
              // ...(services.length > 7 ? [more] : []),
            ]}
            renderItem={({ item, index }) => (
              <IconText
                icon={item.icon}
                text={item.text}
                route={item.route}
                iconContainerStyles={item.iconContainerStyles}
                params={item.params}
                key={index}
              />
            )}
            numColumns={4}
            scrollEnabled={false}
            contentContainerStyle={{
              gap: 16,
              paddingHorizontal: 8,
            }}
            columnWrapperStyle={{
              gap: 16,
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          />

          <View className="px-4">
            <FlatList
              data={list}
              renderItem={({ item, index }) => (
                <ViewCard
                  resource={item}
                  key={index}
                  isLastItem={index === list.length - 1}
                  isOddTotal={list.length % 2 !== 0}
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
        </View>
      </ScrollView>
    </View>
  );
};

export default FaciltityCategory;
