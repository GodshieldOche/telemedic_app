import { Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import { getPracticesOnPractitionerCategory } from "../../../../redux/slices/app/practitioner_category";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import SearchInput from "../../../../components/Common/SearchInput";
import IconText from "../../../../components/Common/IconText";
import { getPractitioners } from "../../../../redux/slices/app/practitioners";
import ViewCard from "../../../../components/Common/ViewCard";
import { Categorish, Service } from "../../../../utils/interface";
import { icons } from "../../../../utils/data";
import _ from "lodash";
import Loader from "../../../../components/Common/Loader";
import NoRecordFound from "../../../../components/Common/NoRecordFound";
import MoreModal from "../../../../components/Modals/MoreModal";

const Practices = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    practitioners: { list },
  } = useAppSelector((state) => state.practitioners);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const actualId = id.split("+")[1];
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    dispatch(
      getPractitioners({
        search_params: {
          practitioner_category_id: actualId,
        },
        signal,
      })
    );
    dispatch(getPracticesOnPractitionerCategory({ id: actualId, signal })).then(
      ({ payload }: { payload: Categorish[] }) => {
        const practices = _.cloneDeep(payload);
        setServices([]);
        practices?.forEach((catgory) => {
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
              isLink: false,
              action: () => {},
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
    route: `/`,
    iconContainerStyles: icons["More"].styles,
    action: () => setModalVisible(true),
    isLink: false,
  };

  return (
    <View className="flex-1  py-4   bg-white">
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
            data={[...services.slice(0, 3), more]}
            renderItem={({ item, index }) => (
              <IconText
                icon={item.icon}
                text={item.text}
                route={item.route}
                iconContainerStyles={item.iconContainerStyles}
                params={item.params}
                key={index}
                isLink={item.isLink}
                action={item.action}
              />
            )}
            numColumns={4}
            scrollEnabled={false}
            contentContainerStyle={{
              gap: 16,
              paddingHorizontal: 16,
            }}
            columnWrapperStyle={{
              gap: 16,
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          />
        </View>
        <ScrollView className="py-2 flex-1">
          {list.length === 0 ? (
            <NoRecordFound />
          ) : (
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
          )}
        </ScrollView>
      </View>
      <MoreModal
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
        action={() => {}}
        loading={false}
        services={services}
      />
    </View>
  );
};

export default Practices;
