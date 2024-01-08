import React from "react";
import { Pressable, Text, View } from "react-native";
import { globalStyles } from "../../constants/styles";
import { Checkbox } from "react-native-ui-lib";

interface Props {
  label: React.ReactNode;
  name: string;
  value: boolean;
  handleChange: any;
  errors: any;
  touched: any;
  handleBlur?: any;
  disabled?: boolean;
}

const CheckBox: React.FC<Props> = ({
  label,
  name,
  value,
  handleChange,
  handleBlur,
  errors,
  touched,
}) => {
  return (
    <View className="w-full flex space-y-2">
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          columnGap: 12,
        }}
      >
        <Checkbox
          value={value}
          onBlur={handleBlur(name)}
          onValueChange={(e) => handleChange(name, e)}
          className="border rounded-[2.5px] w-5 h-5 border-primaryOne"
          size={20}
          borderRadius={2.5}
        />
        {label}
      </View>

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

export default CheckBox;
