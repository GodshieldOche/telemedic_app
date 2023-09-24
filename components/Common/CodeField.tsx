import { View, Text } from "react-native";
import React from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { globalStyles } from "../../constants/styles";

interface Props {
  cell_count: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const CodeFieldComp: React.FC<Props> = ({ cell_count, value, setValue }) => {
  const ref = useBlurOnFulfill({ value, cellCount: cell_count });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <View className="flex-1">
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={cell_count}
        rootStyle={globalStyles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[globalStyles.cell, isFocused && globalStyles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </View>
  );
};

export default CodeFieldComp;
