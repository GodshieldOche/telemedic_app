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
import { globalStyles } from "../../../../constants/styles";

const Practices = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { list } = useAppSelector((state) => state.practitioners);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const actualId = id.split("+")[1];
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    dispatch(
      getPractitioners({
        search_params: `practitioner_category_id=${actualId}`,
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
    route: `/(user)/practitioners/more`,
    iconContainerStyles: icons["More"].styles,
    params: {
      id: id.split("+")[1],
    },
  };

  return (
    <View
      className="flex-1  py-4  bg-white"
      style={{
        rowGap: 24,
      }}
    >
      <View
        className=""
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
            paddingHorizontal: 16,
          }}
          columnWrapperStyle={{
            gap: 16,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        />
      </View>
      {list.length === 0 ? (
        <View className=" flex-1 justify-center items-center">
          <Image
            source={require("../../../../assets/images/no_result.png")}
            className="w-[320px] h-[280px]"
          />
          <Text
            className="text-mainBlack text-center text-base"
            style={[globalStyles.regular_text]}
          >
            No Record found
          </Text>
        </View>
      ) : (
        <ScrollView className=" flex-1">
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
        </ScrollView>
      )}
    </View>
  );
};

export default Practices;
