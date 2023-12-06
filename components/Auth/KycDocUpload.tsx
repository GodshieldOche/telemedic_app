import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import Button from "../Common/Button";
import { ImagePickerAsset } from "expo-image-picker";

interface Props {
  title: string;
  image: ImagePickerAsset;
  handleSubmit: () => void;
  handlePress: () => Promise<void>;
}

const KycDocUpload: React.FC<Props> = ({
  title,
  handlePress,
  image,
  handleSubmit,
}) => {
  return (
    <View className="py-6 px-4 flex justify-center space-y-20 items-center">
      <View className="w-full px-3">
        <View
          className="px-6 justify-center items-center"
          style={{
            width: "100%",
            height: 290,
            backgroundColor: "#838383",
          }}
        >
          <View className="w-full h-[180px] bg-[#D9D9D9]/30 border border-white ">
            <Image
              source={{
                uri: image?.uri,
              }}
              className="w-full h-full"
            />
          </View>
        </View>
      </View>

      <View className="space-y-6">
        <View className="w-full items-center space-y-2  justify-center px-5">
          <Text className="text-[23px]  " style={[globalStyles.semibold_text]}>
            {title}
          </Text>
          <Text
            className="text-center text-sm "
            style={[globalStyles.regular_text]}
          >
            Upload the document by selecting an image from your gallary, ensure
            that the image is landscape
          </Text>
        </View>
        <View
          className=" items-center justify-center"
          style={{
            rowGap: 16,
          }}
        >
          <Button text="Done" disabled={!image} action={handleSubmit} />
          <Pressable>
            <Text
              className="text-base text-primaryOne "
              style={[globalStyles.semibold_text]}
              onPress={handlePress}
            >
              Select file(PNG or JPG)
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default KycDocUpload;
