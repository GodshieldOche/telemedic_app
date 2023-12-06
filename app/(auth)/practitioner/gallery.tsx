import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import GalleryForm from "../../../components/Gallery/GalleryForm";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import { setPractitionerMedia } from "../../../redux/slices/practitioner/practitioner_gallery";
import { router } from "expo-router";

const gallery = () => {
  const { media } = useAppSelector((state) => state.practitionerGallery);
  const [data, setData] = useState(media);

  useEffect(() => {
    setData(media);
  }, [media]);

  const dispatch = useAppDispatch();

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="flex-1 py-6 px-4">
        <GalleryForm
          data={data}
          handleSubmit={(values, setSubmitting) => {
            dispatch(setPractitionerMedia({ data: values }));
            setSubmitting(false);
            router.back();
          }}
        />
      </View>
    </ScrollView>
  );
};

export default gallery;
