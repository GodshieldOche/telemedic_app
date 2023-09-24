import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { globalStyles } from "../../constants/styles";
import { Picker } from "react-native-ui-lib";

interface Props {
  label: string;
  name: string;
  value: string | number | undefined;
  placeholder: string;
  handleChange: any;
  errors: any;
  touched: any;
  handleBlur?: any;
  disabled?: boolean;
  useWheel?: boolean;
  showSearch?: boolean;
  items: {
    label: string;
    value: string | number;
  }[];
  setValue?: any;
}

const Select: React.FC<Props> = ({
  label,
  name,
  placeholder,
  value,
  handleChange,
  handleBlur,
  disabled,
  errors,
  touched,
  items,
  showSearch = true,
  useWheel = false,
  setValue,
}) => {
  const [list, setList] = useState<
    {
      label: string;
      value: string | number;
    }[]
  >(items);

  useEffect(() => {
    setList(items);
  }, [items]);

  return (
    <View className="w-full flex space-y-2">
      <Picker
        label={label}
        value={value}
        showSearch={showSearch}
        placeholder={placeholder}
        onChange={(e) => {
          handleChange(name, e);
          setValue && setValue(e);
        }}
        onBlur={handleBlur(name)}
        useWheelPicker={useWheel}
        useSafeArea
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
            paddingLeft: 8,
            fontSize: 16,
            color: "#2B2B2B",
          },
        ]}
        containerStyle={{
          flexDirection: "column",
          rowGap: Platform.OS === "ios" ? 10 : 7,
          height: 85,
        }}
        items={list}
        onSearchChange={(value) =>
          setList(
            (prev) =>
              (prev = items.filter((item) => item.label.includes(value)))
          )
        }
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

export default Select;
