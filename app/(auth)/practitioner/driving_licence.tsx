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

const DrivingLicence = () => {
  const { files } = useAppSelector((state) => state.practitionerRegister);

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>(
    files.driving_licence
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
          driving_licence: image,
          international_passport: undefined,
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
    router.push("/practitioner/register_three");
  };

  return (
    <ScrollView className="bg-white flex-1">
      <KycDocUpload
        title="Driving Licence"
        handlePress={handlePress}
        handleSubmit={handleSubmit}
        image={image}
      />
    </ScrollView>
  );
};

export default DrivingLicence;
