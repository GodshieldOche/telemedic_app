import { Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { getDaysArray } from "../../utils/helper";
import { FlatList } from "react-native-gesture-handler";
import { globalStyles } from "../../constants/styles";
import moment from "moment";

interface Props {
  start_date: string;
  end_date: string;
}

const DateList: React.FC<Props> = ({ start_date, end_date }) => {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  const todaysDate = new Date().getDate();

  const days = getDaysArray(startDate, endDate);

  return (
    <View>
      <FlatList
        data={days}
        renderItem={({ item }) => {
          const curr = todaysDate === item.getDate();
          return (
            <View
              className={`items-center px-[7px] rounded-full pt-2 pb-[22px]  space-y-3 ${
                curr ? "bg-primaryOne" : "bg-transparent"
              } `}
            >
              <View
                className={`w-[45px] h-[45px] rounded-full justify-center items-center ${
                  curr ? "bg-primaryTwo" : "bg-neutralGray"
                }  `}
              >
                <Text
                  className={` text-base ${
                    curr ? "text-primaryOne" : "text-white"
                  } `}
                  style={[globalStyles.semibold_text]}
                >
                  {item.getDate()}
                </Text>
              </View>
              <Text
                className={` text-base ${
                  curr ? "text-white" : "text-neutralGray"
                } `}
                style={[globalStyles.semibold_text]}
              >
                {moment(item).format("ddd")}
              </Text>
            </View>
          );
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: 16, paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default DateList;
