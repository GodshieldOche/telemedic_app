import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import { Slider } from "react-native-ui-lib";
import { debounce } from "lodash";

interface Props {
  min: number;
  max: number;
  values: {
    min: number;
    max: number;
  };
  names: {
    min: string;
    max: string;
  };
  setFieldValue: any;
}

const Range: React.FC<Props> = ({ min, max, values, names, setFieldValue }) => {
  const debouncedSearch = useRef(
    debounce((setValues: () => void) => {
      setValues();
    }, 500)
  ).current;

  async function handleChange(setValues: () => void) {
    debouncedSearch(setValues);
  }

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Slider
      value={min}
      initialMinimumValue={min}
      initialMaximumValue={max}
      minimumValue={min}
      maximumValue={max}
      useRange
      migrate
      useGap
      trackStyle={{
        height: 2,
        backgroundColor: "#8863F2",
      }}
      minimumTrackTintColor="#8863F2"
      maximumTrackTintColor="#6D7580"
      thumbStyle={{
        height: 12,
        width: 12,
        backgroundColor: "#8863F2",
        borderRadius: 999,
      }}
      onRangeChange={(data) => {
        if (data.min && data.max) {
          const setValues = () => {
            if (
              Math.round(data.min) !== values.min ||
              Math.round(data.max) !== values.max
            ) {
              setFieldValue(names.min, Math.round(data.min));
              setFieldValue(names.max, Math.round(data.max));
            }
          };
          handleChange(setValues);
        }
      }}
    />
  );
};

export default Range;
