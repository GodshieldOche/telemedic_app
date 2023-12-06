import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";
import useAppDispatch from "../../../hooks/useDispatch";
import { getPracticesOnPractitionerCategory } from "../../../redux/slices/app/practitioner_category";
import { Categorish, Service } from "../../../utils/interface";
import { icons } from "../../../utils/data";
import IconText from "../../../components/Common/IconText";
import Loader from "../../../components/Common/Loader";
import { View } from "react-native";

const More = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    dispatch(getPracticesOnPractitionerCategory({ id, signal })).then(
      ({ payload }: { payload: Categorish[] }) => {
        setServices([]);
        payload?.forEach((catgory) => {
          const icon = icons[catgory.name]?.icon || icons["Default"].icon;
          const iconContainerStyles =
            icons[catgory.name]?.styles || icons["Default"].styles;
          setServices((prev) => [
            ...prev,
            {
              text: catgory.name,
              icon,
              route: `/`,
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

  return (
    <ScrollView className=" py-4 bg-white  flex-1">
      <View className="flex-1 justify-center items-center">
        <FlatList
          data={services}
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
            gap: 12,
            paddingHorizontal: 16,
          }}
          columnWrapperStyle={{
            gap: 12,
            alignItems: "flex-start",
          }}
        />
      </View>
    </ScrollView>
  );
};

export default More;
