import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { globalStyles } from "../../constants/styles";
import * as ImagePicker from "expo-image-picker";
import { FlatList } from "react-native-gesture-handler";
import { Video, ResizeMode } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  label: string;
  name: string;
  values: ImagePicker.ImagePickerAsset[];
  type: "All" | "Images" | "Videos";
  multiple?: boolean;
  handleChange: any;
  errors: any;
  touched: any;
  handleBlur?: any;
  disabled?: boolean;
  limit?: number;
}

const MediaPicker: React.FC<Props> = ({
  label,
  name,
  type,
  values,
  handleChange,
  handleBlur,
  disabled,
  errors,
  touched,
  limit,
  multiple = false,
}) => {
  const handlePress = async () => {
    try {
      const media = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: multiple,
        selectionLimit: limit,
        mediaTypes: ImagePicker.MediaTypeOptions[type],
      });
      if (media.canceled) {
        return;
      }
      handleChange(
        name,
        multiple ? [...values, ...media.assets] : media.assets[0]
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      className="w-full  flex "
      style={{
        rowGap: 8,
      }}
    >
      <Text
        className="text-base text-secondaryBlack pl-2"
        style={globalStyles.meduim_text}
      >
        {label}
      </Text>
      <Pressable
        onBlur={handleBlur(name)}
        onPress={handlePress}
        className="w-full relative flex items-center justify-center py-4 bg-white border border-dashed border-primaryOne/40 "
      >
        <Text
          style={[
            globalStyles.semibold_text,
            {
              fontSize: 16,
              paddingHorizontal: 8,
              paddingVertical: 8,
              backgroundColor: "#F2EFFF",
              color: "#8863F2",
            },
          ]}
        >
          Choose File
        </Text>
      </Pressable>

      {values.length > 0 && (
        <FlatList
          data={values}
          renderItem={({ item, index }) => (
            <View
              className="flex-1 w-full border-2 relative border-primaryOne/40 "
              style={{ width: "100%", height: 180 }}
            >
              {type === "Videos" ? (
                <Video
                  style={{ width: "100%", height: "100%" }}
                  source={{
                    uri: item.uri,
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay={false}
                  // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
              ) : (
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              <View className="absolute bg-primaryOne w-7 h-7 bottom-0 rounded-tl  flex justify-center items-center right-0">
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={20}
                  color="white"
                  onPress={() => {
                    const updatedValue = multiple
                      ? values.filter((_, i) => i !== index)
                      : undefined;
                    handleChange(name, updatedValue);
                  }}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.uri}
          numColumns={2}
          columnWrapperStyle={{
            columnGap: 16,
          }}
          contentContainerStyle={{
            rowGap: 16,
          }}
          scrollEnabled={false}
        />
      )}

      {/* {values.map(
        (item, index) =>
          item && (
            <View
              className="py-2 flex flex-row justify-between items-center"
              key={index}
            >
              <Text>{item.fileName}</Text>
              <MaterialCommunityIcons
                name="delete-outline"
                size={24}
                color="black"
                onPress={() => {
                  const updatedValue = multiple
                    ? values.filter((_, i) => i !== index)
                    : undefined;
                  handleChange(name, updatedValue);
                }}
              />
            </View>
          )
      )} */}
      {touched && errors && (
        <Text
          style={[
            globalStyles.regular_text,
            {
              color: "#DA1414",
              fontSize: 12,
              display: touched ? "flex" : "none",
            },
          ]}
        >
          {errors}
        </Text>
      )}
    </View>
  );
};

export default MediaPicker;