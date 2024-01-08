import { Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import NoRecordFound from "../../../components/Common/NoRecordFound";
import Filter from "../../../components/Modals/Filter";
import PractitionersFilterComp, {
  PractitionersFilter,
} from "../../../components/Filters/Practitioners";
import { getCountries } from "../../../redux/slices/app/country";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { globalStyles } from "../../../constants/styles";
import { Iconify } from "react-native-iconify";
import { cloneDeep } from "lodash";

const initValues = {
  country_id: "",
  max_experience: "",
  max_price: "",
  min_experience: "",
  min_price: "",
  practitioner_category_id: "",
  ratings: "",
};

const PractitionersPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const {
    practitioners: { list: resources, ranges },
  } = useAppSelector((state) => state.practitioners);
  const { data: countries } = useAppSelector((state) => state.country);
  const { list: categories } = useAppSelector(
    (state) => state.practitionerCategory
  );

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState<PractitionersFilter>(initValues);
  const [searchParams, setSearchParams] = useState<object>({});

  const params = useLocalSearchParams<PractitionersFilter>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    setServices([]);
    setLoading(true);
    dispatch(getPractitioners({ signal, search_params: params }));
    dispatch(getPractitionerCategories(signal));
    dispatch(getCountries());

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

    return () => {
      abortController.abort();
    };
  }, [params]);

  useEffect(() => {
    if (!params) {
      return;
    }
    setFilters(params);

    const map: Record<any, string | undefined> = {};

    if (params.practitioner_category_id) {
      const category = categories.find(
        (category) => category.id === params.practitioner_category_id
      );
      map["Category"] = category?.name;
    }
    if (params.country_id) {
      const country = countries.find(
        (country) => country.value === params.country_id
      );
      map["Country"] = country?.name;
    }
    if (params.min_price && params.max_price) {
      map["Price"] = `$${params.min_price}-$${params.max_price}`;
    }
    if (params.min_experience && params.max_experience) {
      map["Exp"] = `${params.min_experience}-${params.max_experience} years`;
    }
    if (params.ratings) {
      map["Rating"] = `${params.ratings}+`;
    }

    setSearchParams(map);
  }, [params]);

  useEffect(() => {
    if (!ranges) {
      return;
    }

    setFilters(
      (prev) =>
        (prev = {
          ...prev,
          max_experience: ranges.max_experience.toString(),
          max_price: ranges.max_price.toString(),
          min_experience: ranges.min_experience.toString(),
          min_price: ranges.min_price.toString(),
        })
    );
  }, [ranges]);

  if (loading) {
    return <Loader />;
  }

  const handleSubmit = async (
    values: any,
    setSubmitting?: (isSubmitting: boolean) => void
  ) => {
    for (const key in values) {
      if (values[key] == "" || values[key] == undefined) {
        delete values[key];
      }
    }
    router.setParams(values);
    setSubmitting?.(false);
    setModalVisible(false);
  };

  const handleRemoveParam = (key: string) => {
    const newParams: any = cloneDeep(params);
    if (key === "Exp") {
      delete newParams.min_experience;
      delete newParams.max_experience;
    }

    if (key === "Price") {
      delete newParams.min_price;
      delete newParams.max_price;
    }

    if (key === "Rating") {
      delete newParams.ratings;
    }

    if (key === "Country") {
      delete newParams.country_id;
    }

    if (key === "Category") {
      delete newParams.practitioner_category_id;
    }
    router.setParams(newParams);
  };

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
            <SearchInput toggleFilter={setModalVisible} />
          </View>
          <View className="px-4 flex-row space-x-2 items-center ">
            <Text
              className="text-primaryOne text-xs"
              style={[globalStyles.meduim_text]}
            >
              Clear All
            </Text>
            <View className="flex-row flex-wrap gap-4 ">
              {Object.keys(searchParams).map((key, index) => (
                <View
                  key={index}
                  className="px-4 py-2 rounded-lg flex-row space-x-1 items-center bg-primaryTwo "
                >
                  <Text
                    className="text-secondarySix text-xs capitalize "
                    style={[globalStyles.meduim_text]}
                  >
                    {key}
                  </Text>
                  <Text
                    className="text-primaryOne text-xs capitalize "
                    style={[globalStyles.meduim_text]}
                  >
                    {searchParams[key as keyof typeof searchParams]}
                  </Text>
                  <Pressable onPress={() => handleRemoveParam(key)}>
                    <Iconify icon="ion:close" size={14} color="#18273B" />
                  </Pressable>
                </View>
              ))}
            </View>
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
      <Filter
        modalVisible={modalVisible}
        clearAll={() => {
          setFilters(initValues);
          setModalVisible(false);
        }}
        closeModal={() => setModalVisible(false)}
      >
        <PractitionersFilterComp
          data={filters}
          countries={countries}
          categories={categories}
          handleSubmit={handleSubmit}
        />
      </Filter>
    </View>
  );
};

export default PractitionersPage;
