import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import { router } from "expo-router";
import BannerProfileForm from "../../../components/Gallery/BannerProfileForm";
import { setPractitionerFiles } from "../../../redux/slices/practitioner/practitioner_signup";

const images = () => {
  const {
    files: { banner_image, profile_image },
  } = useAppSelector((state) => state.practitionerRegister);
  const [data, setData] = useState({
    banner_image,
    profile_image,
  });

  useEffect(() => {
    setData({
      banner_image,
      profile_image,
    });
  }, [banner_image, profile_image]);

  const dispatch = useAppDispatch();

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="flex-1 py-6 px-4">
        <BannerProfileForm
          data={data}
          handleSubmit={(values, setSubmitting) => {
            dispatch(setPractitionerFiles({ data: values }));
            setSubmitting(false);
            router.back();
          }}
        />
      </View>
    </ScrollView>
  );
};

export default images;
