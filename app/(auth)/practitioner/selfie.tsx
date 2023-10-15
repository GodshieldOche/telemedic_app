import { Image, Pressable, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Pic } from "../../../components/Common/svgs";
import { globalStyles } from "../../../constants/styles";
import Button from "../../../components/Common/Button";
import CameraComp from "../../../components/Common/Camera";
import { Camera, CameraCapturedPicture, ImageType } from "expo-camera";
import { Octicons } from "@expo/vector-icons";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import { setPractitionerFiles } from "../../../redux/slices/practitioner/practitioner_signup";
import { router } from "expo-router";

const selfie = () => {
  const { files } = useAppSelector((state) => state.practitionerRegister);
  const [imageType, _] = useState(ImageType.jpg);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [image, setImage] = useState<CameraCapturedPicture | undefined>(
    files.kyc_image
  );

  const cameraRef = useRef<Camera>(null);
  const dispatch = useAppDispatch();

  const handleTakePicture = async () => {
    const result = await cameraRef.current?.takePictureAsync({
      isImageMirror: true,
      scale: 0,
      imageType,
    });
    if (!result) {
      return;
    }
    setImage(result);
    setIsCameraActive(false);
  };

  const handleClick = async () => {
    if (isCameraActive) {
      await handleTakePicture();
    } else if (image) {
      dispatch(
        setPractitionerFiles({
          data: {
            kyc_image: image,
          },
        })
      );
      router.back();
    } else {
      setIsCameraActive(true);
    }
  };

  return (
    <ScrollView className="bg-white flex-1">
      <View className="py-6 px-4 flex justify-center space-y-9 items-center">
        <View className="w-[250px] h-[270px] bg-primaryGray ">
          {isCameraActive ? (
            <CameraComp ref={cameraRef} handleTakePicture={handleTakePicture} />
          ) : image ? (
            <Image
              className="w-full h-full object-contain"
              source={{ uri: image.uri }}
            />
          ) : (
            <View className="w-full h-full justify-center items-center border border-[#A5ABB3] bg-primaryGray">
              <Pic />
            </View>
          )}
        </View>

        <View className="space-y-3 px-5 items-center">
          {image && <Octicons name="check-circle" size={40} color="#5EC376" />}

          <Text className="text-2xl " style={[globalStyles.semibold_text]}>
            {image ? "Nice job, Weldone" : "Take a Selfie"}
          </Text>
          <Text
            className="text-base text-[#545D69] text-center"
            style={[globalStyles.regular_text]}
          >
            The image should be clear and have your face fully inside the frame,
            and don't forget to smile.
          </Text>
        </View>
        <View
          className="w-full items-center justify-center !mt-16"
          style={{
            rowGap: 16,
          }}
        >
          <Button
            text={image ? "Done" : "Open Camera"}
            disabled={isCameraActive}
            action={handleClick}
          />
          {image && (
            <Pressable
              onPress={() => {
                setImage(undefined);
                setIsCameraActive(true);
              }}
            >
              <Text
                className="text-primaryOne text-xl"
                style={[globalStyles.semibold_text]}
              >
                Retake
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default selfie;
