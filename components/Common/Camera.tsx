import React, { useEffect, useState } from "react";
import { Camera, CameraType, FaceDetectionResult } from "expo-camera";
import Loader from "./Loader";
import { View } from "../Themed";
import { Button, Text } from "react-native";
import { globalStyles } from "../../constants/styles";
import * as FaceDetector from "expo-face-detector";
import { FaceDetectionChecks } from "../../utils/interface";

interface Props {
  handleTakePicture: () => Promise<void>;
}

const CameraComp = React.forwardRef<Camera, Props>(
  ({ handleTakePicture }, ref) => {
    const [hasPermission, setHasPermission] = React.useState<boolean>();
    const [faces, setFaces] = useState<FaceDetectionResult["faces"]>([]);

    const requestPermission = async () => {
      const { granted } = await Camera.requestCameraPermissionsAsync();
      return granted;
    };

    useEffect(() => {
      (async () => {
        const granted = await requestPermission();
        setHasPermission(granted);
      })();
    }, []);

    if (hasPermission === undefined) {
      return <Loader />;
    }

    if (!hasPermission) {
      return (
        <View
          className="w-full h-full bg-primaryGray flex-1 justify-center px-5 items-center"
          style={{
            rowGap: 24,
          }}
        >
          <Text style={[globalStyles.semibold_text, { textAlign: "center" }]}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }

    const getFaceDataView = () => {
      if (faces.length === 0) {
        return <View></View>;
      } else {
        const person = faces[0] as FaceDetector.FaceFeature;

        const isSmiling = person.smilingProbability! > 0.7;
        const isEyeShut =
          person.rightEyeOpenProbability! < 0.7 &&
          person.leftEyeOpenProbability! < 0.4;
        const isFace = faces.length === 1;

        let borderColor = "red";

        if (isSmiling && !isEyeShut && isFace) {
          borderColor = "green";
          handleTakePicture();
        } else {
          borderColor = "red";
        }

        const { origin, size } = person.bounds;

        return (
          <View
            style={{
              width: size.width,
              height: size.height,
              position: "absolute",
              top: origin.y,
              left: origin.x,
              backgroundColor: "transparent",
              borderColor,
              borderWidth: 1.5,
            }}
          ></View>
        );
      }
    };

    return (
      <Camera
        ref={ref}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
        zoom={0}
        type={CameraType.front}
        onFacesDetected={(res) => {
          setFaces(res.faces);
        }}
        autoFocus
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.accurate,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 1000,
          tracking: true,
        }}
      >
        {getFaceDataView()}
      </Camera>
    );
  }
);

export default CameraComp;
