import React, { useState, useEffect } from "react";
import { Platform, Text, TextInputIOSProps, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../constants/styles";
import { Feather } from "@expo/vector-icons";
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
  secureTextEntry?: boolean;
  autoCapitalize?: "characters" | "words" | "sentences" | "none";
}

const Input: React.FC<Props> = ({
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
  secureTextEntry = false,
  mode = "text",
}) => {
  const [shouldHide, setSecureTextEntry] = useState<boolean>(secureTextEntry);

  useEffect(() => {
    setSecureTextEntry(secureTextEntry);
  }, []);

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
          onChangeText={(e) => handleChange(name, e)}
          onBlur={handleBlur(name)}
          value={value}
          autoCapitalize={autoCapitalize}
          textContentType={type}
          inputMode={mode}
          secureTextEntry={shouldHide}
        />
        {["password", "confirm_password", "password_confirmation"].includes(
          name
        ) && (
          <View className="absolute h-full top-0 bottom-0 right-4 flex flex-col justify-center">
            {shouldHide ? (
              <Feather
                name="eye"
                size={16}
                color="#858C94"
                onPress={() => setSecureTextEntry(false)}
              />
            ) : (
              <Feather
                name="eye-off"
                size={16}
                color="#8863F2"
                onPress={() => setSecureTextEntry(true)}
              />
            )}
          </View>
        )}
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

export default Input;
