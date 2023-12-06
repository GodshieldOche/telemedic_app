import { View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import Loader from "../../../components/Common/Loader";
import GalleryForm from "../../../components/Gallery/GalleryForm";
import {
  Certification,
  FacilityRegisterData,
  Gallery,
  Licence,
} from "../../../utils/interface";
import {
  postAddFacilityCertification,
  postAddFacilityLicence,
} from "../../../redux/slices/facility/facility_portfolio";
import {
  postFacilityRequestOTP,
  postFacilitySignUp,
} from "../../../redux/slices/facility/facility_signup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { messageAlert } from "../../../components/Common/Alerts";
import { postAddToFacilityGallery } from "../../../redux/slices/facility/facility_gallery";
import { router } from "expo-router";

const CreateAccountFacility = () => {
  const { loading } = useAppSelector((state) => state.facilityCategory);
  const { data: facility } = useAppSelector((state) => state.facilityRegister);
  const { certifications, licences } = useAppSelector(
    (state) => state.facilityPortfolio
  );
  const dispacth = useAppDispatch();

  const [data, _] = useState({
    images: [],
    videos: [],
  });

  if (loading) {
    return <Loader />;
  }

  const handleSubmit = async (
    media: Gallery,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const body: FacilityRegisterData = {
      ...facility,
      address: {
        ...facility.address,
        city_id: Number(facility.address.city_id),
        state_id: Number(facility.address.state_id),
        country_id: Number(facility.address.country_id),
      },
    };
    const response = await dispacth(postFacilitySignUp(body));
    if (response.error) {
      console.log(response);
      setSubmitting(false);
      messageAlert(
        "Error",
        (response?.payload && response?.payload[0]?.error) ||
          "Something went wrong"
      );
      return;
    }

    const token = await AsyncStorage.getItem("facilityToken");
    if (!token) {
      setSubmitting(false);
      messageAlert("Error", "Invalid or expired token");
      return;
    }

    await handleSubmitCertifications(token, setSubmitting);
    await handleSubmitLicences(token, setSubmitting);
    await handleSubmitMedia(media, token, setSubmitting);
    const res = await dispacth(
      postFacilityRequestOTP({ email: response.payload })
    );

    if (res.error) {
      setSubmitting(false);
      messageAlert(
        "Error",
        (res?.payload && res?.payload[0]?.error) || "Something went wrong"
      );
      return;
    }

    setSubmitting(false);
    router.push("/(auth)/facility/verify");
  };

  const handleSubmitCertifications = async (
    token: string,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    certifications.forEach(async (certification) => {
      const body = new FormData();

      Object.keys(certification).forEach(async (key) => {
        if (key !== "certificate_doc") {
          body.append(key, certification[key as keyof Certification]);
        } else {
          const doc = certification[key as keyof Certification];
          const file = {
            uri: doc.uri,
            type: doc.mimetype,
            name: doc.name,
          };
          body.append(key, file as any);
        }
      });

      const response = await dispacth(
        postAddFacilityCertification({ body, token })
      );
      if (response.error) {
        setSubmitting(false);
        messageAlert(
          "Error",
          (response?.payload && response?.payload[0]?.error) ||
            "Something went wrong"
        );
        return;
      }
    });
  };

  const handleSubmitLicences = async (
    token: string,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    licences.forEach(async (licence) => {
      const body = new FormData();

      Object.keys(licence).forEach((key) => {
        if (key !== "licence_doc") {
          body.append(key, licence[key as keyof Licence]);
        } else {
          const doc = licence[key as keyof Licence];
          const file = {
            uri: doc.uri,
            type: doc.mimetype,
            name: doc.name,
          };
          body.append(key, file as any);
        }
      });

      const response = await dispacth(postAddFacilityLicence({ body, token }));
      if (response.error) {
        setSubmitting(false);
        messageAlert(
          "Error",
          (response?.payload && response?.payload[0]?.error) ||
            "Something went wrong"
        );
        return;
      }
    });
  };

  const handleSubmitMedia = async (
    media: Gallery,
    token: string,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const body = new FormData();

    media.images.forEach((image) => {
      const file = {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      };
      body.append("images", file as any);
    });

    media.videos.forEach((video) => {
      const file = {
        uri: video.uri,
        type: video.type,
        name: video.fileName,
      };
      body.append("videos", file as any);
    });

    const response = await dispacth(postAddToFacilityGallery({ body, token }));
    if (response.error) {
      setSubmitting(false);
      messageAlert(
        "Error",
        (response?.payload && response?.payload[0]?.error) ||
          "Something went wrong"
      );
      return;
    }
  };

  return (
    <ScrollView className="bg-white  flex-1" nestedScrollEnabled={true}>
      <View className="flex-1 py-6 px-4">
        <GalleryForm data={data} handleSubmit={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default CreateAccountFacility;
