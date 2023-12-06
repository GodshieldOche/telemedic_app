import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import SearchInput from "../../../components/Common/SearchInput";
import IconText from "../../../components/Common/IconText";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import { getPractitionerCategories } from "../../../redux/slices/app/practitioner_category";
import { Categorish, Resource, Service } from "../../../utils/interface";
import { icons } from "../../../utils/data";
import { getPractitioners } from "../../../redux/slices/app/practitioners";
import ViewCard from "../../../components/Common/ViewCard";
import Loader from "../../../components/Common/Loader";

const PractitionersPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setServices([]);
    setResources([]);
    setLoading(true);
    dispatch(getPractitioners({})).then(
      ({ payload }: { payload: Resource[] }) => {
        setResources(payload);
      }
    );

    dispatch(getPractitionerCategories()).then(
      ({ payload }: { payload: Categorish[] }) => {
        payload.forEach((catgory) => {
          const icon = icons[catgory.name].icon;
          const iconContainerStyles = icons[catgory.name].styles;
          setServices((prev) => [
            ...prev,
            {
              text: catgory.name,
              icon,
              route:
                `/(user)/practitioners/category/${catgory.name}+${catgory.id}` as Service["route"],
              iconContainerStyles,
            },
          ]);

          setLoading(false);
        });
      }
    );
  }, []);

  if (loading) {
    return <Loader />;
  }

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
        </View>
      </ScrollView>
    </View>
  );
};

export default PractitionersPage;
