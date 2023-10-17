import React from "react";
import { Pressable, Text, View } from "react-native";
import { globalStyles } from "../../constants/styles";
import * as DocumentPicker from "expo-document-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  label: string;
  name: string;
  values: DocumentPicker.DocumentPickerAsset[];
  type: string | string[];
  multiple?: boolean;
  handleChange: any;
  errors: any;
  touched: any;
  handleBlur?: any;
  disabled?: boolean;
  autoCapitalize?: "characters" | "words" | "sentences" | "none";
}

const DocPicker: React.FC<Props> = ({
  label,
  name,
  type,
  values,
  handleChange,
  handleBlur,
  disabled,
  errors,
  touched,
  multiple = false,
}) => {
  const handlePress = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        multiple,
        type,
      });
      if (document.canceled) {
        return;
      }
      handleChange(
        name,
        multiple ? [...values, ...document.assets] : document.assets[0]
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
        className="text-base text-secondaryBlack pl-4"
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

      {values.map(
        (item, index) =>
          item && (
            <View
              className="py-2 flex flex-row justify-between items-center"
              key={index}
            >
              <Text>{item.name}</Text>
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
      )}
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

export default DocPicker;
