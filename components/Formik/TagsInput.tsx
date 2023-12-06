import React, { useState } from "react";
import { Platform, Text, TextInputIOSProps, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../constants/styles";
import { TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  label: string;
  name: string;
  values: string[];
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

const TagsInput: React.FC<Props> = ({
  label,
  name,
  placeholder,
  type,
  values,
  handleChange,
  handleBlur,
  disabled,
  errors,
  touched,
  autoCapitalize = "none",
  mode = "text",
}) => {
  const [text, setText] = useState("");
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
          style={[
            globalStyles.regular_text,
            {
              borderWidth: 1,
              borderColor: "#DADEE3",
              padding: Platform.OS === "ios" ? 16 : 14,
              fontSize: 16,
              borderRadius: 8,
              color: "#2B2B2B",
              backgroundColor: "#fff",
            },
          ]}
          onChangeText={(e) => setText(e)}
          value={text}
          onSubmitEditing={(e) => {
            const updatedValues = new Set([
              ...values,
              e.nativeEvent.text.trim(),
            ]);
            handleChange(name, [...updatedValues]);
            setText("");
            e.preventDefault();
          }}
          onBlur={handleBlur(name)}
          autoCapitalize={autoCapitalize}
          textContentType={type}
          inputMode={mode}
          placeholderTextColor="#858C94"
        />
      </View>
      <View
        className="flex flex-row flex-wrap"
        style={{
          columnGap: 8,
          rowGap: 8,
        }}
      >
        {values.map((value, index) => (
          <View
            key={index}
            style={[
              {
                backgroundColor: "#A5ABB3",
                paddingVertical: 4,
                paddingLeft: 12,
                paddingRight: 10,
                borderRadius: 9999,
                flexDirection: "row",
                columnGap: 8,
                justifyContent: "space-between",
              },
            ]}
          >
            <Text
              style={[
                globalStyles.semibold_text,
                { color: "white", fontSize: 15 },
              ]}
            >
              {value}
            </Text>
            <Ionicons
              name="ios-close-circle-outline"
              size={18}
              style={{
                padding: 0,
                margin: 0,
              }}
              onPress={() => {
                const updatedValues = values.filter((item) => item !== value);
                handleChange(name, updatedValues);
              }}
              color="white"
            />
          </View>
        ))}
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

export default TagsInput;
