import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import {
  setPractitionerFiles,
  setPractitionerRegisterData,
} from "../../../redux/slices/practitioner/practitioner_signup";
import { router } from "expo-router";
import KycDocUpload from "../../../components/Auth/KycDocUpload";

const InternationalPassport = () => {
  const { files } = useAppSelector((state) => state.practitionerRegister);

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>(
    files.international_passport
  );

  const dispatch = useAppDispatch();

  const handlePress = async () => {
    try {
      const media = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: false,
        mediaTypes: ImagePicker.MediaTypeOptions["Images"],
      });
      if (media.canceled) {
        return;
      }
      setImage(media.assets[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    dispatch(
      setPractitionerFiles({
        data: {
          driving_licence: undefined,
          international_passport: image,
        },
      })
    );
    dispatch(
      setPractitionerRegisterData({
        data: {
          nin: "",
        },
      })
    );
    router.push("/practitioner/register_four");
  };

  return (
    <ScrollView className="bg-white flex-1">
      <KycDocUpload
        title="International Passport"
        image={image}
        handlePress={handlePress}
        handleSubmit={handleSubmit}
      />
    </ScrollView>
  );
};

export default InternationalPassport;
