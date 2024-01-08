import React, { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { globalStyles } from "../../constants/styles";
import { Picker, PickerModes } from "react-native-ui-lib";
import { Iconify } from "react-native-iconify";

interface Props {
  label: string;
  name: string;
  value: any;
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
  mode?: "MULTI" | "SINGLE";
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
  mode = "SINGLE",
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
        mode={PickerModes[mode]}
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
        items={list}
        onSearchChange={(value) =>
          setList(
            (prev) =>
              (prev = items.filter((item) => item.label.includes(value)))
          )
        }
        trailingAccessory={
          <Iconify icon="typcn:arrow-sorted-down" size={20} color="#858C94" />
        }
        placeholderTextColor="#858C94"
        searchStyle={{
          placeholderTextColor: "#858C94",
        }}
      />

      {errors && (
        <Text
          style={[
            globalStyles.regular_text,
            {
              color: "#DA1414",
              fontSize: 12,
              paddingLeft: 16,
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
