import { View, Text, Image } from "react-native";
import React from "react";
import { globalStyles } from "../../../constants/styles";
import { useRouter } from "expo-router";
import { useAppSelector } from "../../../hooks/useDispatch";
import AdderHeader from "../../Common/AdderHeader";
import IconButton from "../../Common/IconButton";
import { Path, Svg } from "react-native-svg";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const PractitionerInformation = () => {
  const {
    data: { description, hourly_rate, languages },
    files: { banner_image, profile_image },
  } = useAppSelector((state) => state.practitionerRegister);
  const { media } = useAppSelector((state) => state.practitionerGallery);
  const router = useRouter();

  return (
    <>
      <ScrollView className=" py-6 px-4 flex-1">
        <View className="py-7 flex-1 !mb-28 relative space-y-12">
          {/* About */}
          <View className="flex-1 space-y-3">
            <AdderHeader
              title="About"
              action={() => router.push("/(auth)/practitioner/about")}
              isPlain
            />
            {description && (
              <View className="bg-primaryGray p-5 space-y-4 rounded-lg ">
                <Text style={[globalStyles.regular_text, { fontSize: 16 }]}>
                  {description}
                </Text>
              </View>
            )}
          </View>

          {/* Banner & Profile Picture */}
          <View className="flex-1 space-y-3">
            <AdderHeader
              title="Banner & Display Image"
              action={() => router.push("/(auth)/practitioner/images")}
              isPlain
            />
            {banner_image && profile_image && (
              <View className="bg-primaryGray p-5 space-y-4 rounded-lg ">
                <FlatList
                  data={[banner_image, profile_image]}
                  renderItem={({ item, index }) => (
                    <View
                      className="flex-1 w-full border-2 relative border-primaryOne/40 "
                      style={{ width: "100%", height: 180 }}
                    >
                      <Image
                        source={{ uri: item.uri }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </View>
                  )}
                  keyExtractor={(item) => item.uri}
                  numColumns={2}
                  columnWrapperStyle={{
                    columnGap: 16,
                  }}
                  contentContainerStyle={{
                    rowGap: 16,
                  }}
                  scrollEnabled={false}
                />
              </View>
            )}
          </View>

          {/* Gallery */}
          <View className="flex-1 space-y-3">
            <AdderHeader
              title="Gallery"
              action={() => router.push("/(auth)/practitioner/gallery")}
              isPlain
            />
            {media.images.length > 0 && (
              <View className="bg-primaryGray p-5 space-y-4 rounded-lg ">
                <Text style={[globalStyles.meduim_text, { fontSize: 16 }]}>
                  {media.images.length} Images
                </Text>
                <Text style={[globalStyles.meduim_text, { fontSize: 16 }]}>
                  {media.videos.length} Videos
                </Text>
              </View>
            )}
          </View>

          {/* Hourly Rate Charge */}
          <View className="flex-1 space-y-3">
            <AdderHeader
              title="Hourly Rate Charge"
              action={() => router.push("/(auth)/practitioner/hourly_rate")}
              isPlain
            />
            {hourly_rate && (
              <View className="bg-primaryGray p-5 space-y-4 rounded-lg ">
                <Text style={[globalStyles.meduim_text, { fontSize: 16 }]}>
                  ₦{hourly_rate}/hr
                </Text>
              </View>
            )}
          </View>

          {/* Language(s) */}
          <View className="flex-1 space-y-3">
            <AdderHeader
              title="Language(s)"
              action={() => router.push("/(auth)/practitioner/languages")}
              isPlain
            />
            {languages.length > 0 && (
              <View className="bg-primaryGray p-5 space-y-4 rounded-lg ">
                <Text style={[globalStyles.meduim_text, { fontSize: 16 }]}>
                  {languages.map((language) => language.name).join(", ")}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-4 right-4 ">
        <IconButton
          SVG={
            <Svg width="28" height="28" color="#fff" viewBox="0 0 24 24">
              <Path
                fill="currentColor"
                d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"
              />
            </Svg>
          }
          action={() => router.push("/(auth)/practitioner/register_four")}
          disabled={
            languages.length === 0 ||
            !hourly_rate ||
            !description ||
            !media ||
            !banner_image ||
            !profile_image
          }
        />
      </View>
    </>
  );
};

export default PractitionerInformation;
