import { View, FlatList, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { slides } from "../utils/data";
import OnboardingItem from "../components/Onboarding/OnboardingItem";
import Paginator from "../components/Onboarding/Paginator";
import Button from "../components/Common/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Common/Loader";
import { Redirect, useRouter } from "expo-router";
import { globalStyles } from "../constants/styles";

const Onboarding = () => {
  const [loading, setLoading] = useState(true);
  const [alreadyViewd, setAlreadyViewd] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const descriptionOpacity = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<any>(null);
  const router = useRouter();

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0]?.index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const checkViewedOnboarding = async () => {
    try {
      const viewdOnboarding = await AsyncStorage.getItem("@viewdOnboarding");

      if (viewdOnboarding === "true") {
        setAlreadyViewd(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem("@viewdOnboarding", "true");
    } catch (error) {
      console.log(error);
    } finally {
      router.replace("/(auth)/");
    }
  };

  useEffect(() => {
    checkViewedOnboarding();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }
    const interval = setInterval(() => {
      const nextSlideIndex = (currentIndex + 1) % slides.length;

      slidesRef.current.scrollToIndex({
        animated: true,
        index: nextSlideIndex,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, loading]);

  useEffect(() => {
    if (loading) {
      return;
    }
    Animated.timing(titleOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(descriptionOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    const timeout = setTimeout(() => {
      Animated.timing(titleOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      Animated.timing(descriptionOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentIndex, loading]);

  if (loading) {
    return <Loader />;
  }

  if (alreadyViewd) {
    return <Redirect href="/(auth)/" />;
  }

  return (
    <View className="flex-1 flex-col relative bg-primaryOne ">
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        ref={slidesRef}
        viewabilityConfig={viewConfig}
      />
      <View className="absolute h-[45%] w-full bottom-0 rounded-t-[40px] bg-white flex flex-col  items-center pt-6 pb-12 px-6 justify-between  ">
        <View className="flex-1 h-full w-full space-y-7 items-center">
          <Paginator data={slides} scrollX={scrollX} />
          <View className="max-w-[255px] flex flex-col space-y-3">
            <Animated.Text
              className="text-[28px] leading-[40px] text-center text-mainBlack "
              style={[globalStyles.bold_text, { opacity: titleOpacity }]}
            >
              {slides[currentIndex]?.title}
            </Animated.Text>
            <Animated.Text
              className="text-lg text-secondaryBlack text-center "
              style={[
                globalStyles.regular_text,
                {
                  opacity: descriptionOpacity,
                },
              ]}
            >
              {slides[currentIndex]?.description}
            </Animated.Text>
          </View>
        </View>

        <Button text="Get Started" action={handleGetStarted} />
      </View>
    </View>
  );
};

export default Onboarding;
