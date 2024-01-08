import { View, TextInput, Platform, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";
import { Iconify } from "react-native-iconify";
import { globalStyles } from "../../constants/styles";
import { debounce } from "lodash";

type Props = {
  toggleFilter?: React.Dispatch<React.SetStateAction<boolean>>;
  hideFilter?: boolean;
  placholder?: string;
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput: React.FC<Props> = ({
  toggleFilter,
  hideFilter,
  placholder = "Search",
  setQuery,
}) => {
  const debouncedSearch = useRef(
    debounce((value) => {
      if (value.length >= 3) {
        setQuery?.(value);
      } else {
        setQuery?.("");
      }
    }, 500)
  ).current;

  async function handleChange(text: string) {
    debouncedSearch(text);
  }
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  return (
    <View className="flex flex-row w-full relative justify-between items-center bg-primaryGray py-[10px] px-4 rounded-lg">
      <Iconify icon="ic:round-search" size={24} color="#858C94" />
      <TextInput
        placeholder={placholder}
        placeholderTextColor="#858C94"
        className="text-mainBlack"
        style={[
          globalStyles.regular_text,
          {
            width: hideFilter ? "90%" : "80%",
            paddingVertical: Platform.OS === "ios" ? 6 : 2,
            fontSize: 13,
          },
        ]}
        onChangeText={handleChange}
      />
      {!hideFilter && (
        <Pressable onPress={() => toggleFilter?.(true)}>
          <Iconify icon="ion:filter" size={20} color="#8863F2" />
        </Pressable>
      )}
    </View>
  );
};

export default SearchInput;
