import React, { useState, useEffect } from "react";
import { ErrorMessage, Field } from "formik";
import { Text, TextInputIOSProps, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";

interface Props {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  type: TextInputIOSProps["textContentType"];
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
}) => {
  const [shouldHide, setSecureTextEntry] = useState<boolean>(secureTextEntry);

  useEffect(() => {
    setSecureTextEntry(secureTextEntry);
  }, []);

  return (
    <View className="w-full flex gap-y-2">
      <Text
        className="text-lg text-secondaryBlack pl-2"
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
              padding: 16,
              fontSize: 18,
              borderRadius: 8,
              color: "#2B2B2B",
            },
          ]}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          value={value}
          autoCapitalize={autoCapitalize}
          textContentType={type}
          secureTextEntry={shouldHide}
        />
        {["password", "confirmPassword", "password_confirmation"].includes(
          name
        ) && (
          <View className="absolute h-full top-0 bottom-0 right-4 flex flex-col justify-center">
            {shouldHide ? (
              <Feather
                name="eye"
                size={18}
                color="#8863F2"
                onPress={() => setSecureTextEntry(false)}
              />
            ) : (
              <Feather
                name="eye-off"
                size={18}
                color="#858C94"
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
