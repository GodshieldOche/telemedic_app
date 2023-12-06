import React from "react";
import { Platform, Text, View } from "react-native";
import { globalStyles } from "../../constants/styles";
import { DateTimePicker } from "react-native-ui-lib";

interface Props {
  label: string;
  name: string;
  value: Date | undefined;
  placeholder: string;
  handleChange: any;
  errors: any;
  touched: any;
  handleBlur?: any;
  disabled?: boolean;
  mode?: "date" | "time";
}

const DateTime: React.FC<Props> = ({
  label,
  name,
  placeholder,
  value,
  handleChange,
  handleBlur,
  disabled,
  errors,
  touched,
  mode,
}) => {
  return (
    <View className="w-full flex space-y-2">
      <DateTimePicker
        label={label}
        placeholder={placeholder}
        mode={mode}
        value={value}
        onChange={(e) => handleChange(name, e)}
        onBlur={handleBlur(name)}
        fieldStyle={{
          borderWidth: 1,
          borderColor: "#DADEE3",
          padding: Platform.OS === "ios" ? 16 : 14,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
        style={[
          globalStyles.regular_text,
          {
            fontSize: 16,
            color: "#2B2B2B",
            textTransform: "capitalize",
          },
        ]}
        labelStyle={[
          globalStyles.meduim_text,
          {
            paddingLeft: 16,
            fontSize: 16,
            color: "#2B2B2B",
          },
        ]}
        containerStyle={{
          flexDirection: "column",
          rowGap: Platform.OS === "ios" ? 10 : 7,
          height: 85,
        }}
        placeholderTextColor="#858C94"
      />
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

export default DateTime;
