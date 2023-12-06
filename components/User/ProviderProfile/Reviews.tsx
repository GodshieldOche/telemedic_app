import { View, Text } from "react-native";
import React from "react";
import ReviewCard from "../../Common/ReviewCard";

const Reviews = () => {
  return (
    <View
      className="px-4"
      style={{
        rowGap: 16,
      }}
    >
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
    </View>
  );
};

export default Reviews;
