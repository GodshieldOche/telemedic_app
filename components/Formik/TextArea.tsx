import React from "react";
import { Platform, Text, TextInputIOSProps, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../constants/styles";
import { TextInputProps } from "react-native";

interface Props {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  type: TextInputIOSProps["textContentType"];
  mode?: TextInputProps["inputMode"];
  handleChange: any;
  errors: any;
  touched: any;
  handleBlur?: any;
  disabled?: boolean;
  autoCapitalize?: "characters" | "words" | "sentences" | "none";
}

const TextArea: React.FC<Props> = ({
  label,
  name,
  placeholder,
  type,
  value,
  handleChange,
  handleBlur,
  disabled,
  errors,
  touched,
  autoCapitalize = "none",
  mode = "text",
}) => {
  return (
    <View className="w-full  flex space-y-2">
      <Text
        className="text-base text-secondaryBlack pl-4"
        style={globalStyles.meduim_text}
      >
        {label}
      </Text>
      <View className="w-full relative">
        <TextInput
          placeholder={placeholder}
          className="focus:border-primaryOne/60"
          multiline
          style={[
            globalStyles.regular_text,
            {
              borderWidth: 1,
              borderColor: "#DADEE3",
              padding: Platform.OS === "ios" ? 16 : 14,
              fontSize: 16,
              paddingTop: Platform.OS === "ios" ? 16 : 14,
              height: 100,
              borderRadius: 8,
              color: "#2B2B2B",
              backgroundColor: "#fff",
              justifyContent: "flex-start",
            },
          ]}
          numberOfLines={20}
          onChange={(e) => e.nativeEvent.text.trim}
          onChangeText={(e) => handleChange(name, e)}
          onBlur={handleBlur(name)}
          value={value}
          autoCapitalize={autoCapitalize}
          textContentType={type}
          inputMode={mode}
          textAlignVertical="top"
          placeholderTextColor="#858C94"
        />
      </View>
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

export default TextArea;
