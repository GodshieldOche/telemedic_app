import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { globalStyles } from "../../../../constants/styles";
import { ScrollView } from "react-native-gesture-handler";
import { Iconify } from "react-native-iconify";

const options = [
  {
    icon: <Iconify icon="logos:google-gmail" size={20} />,
    title: "Gmail",
    description: "support@medicare.info",
    action: () => {},
  },
  {
    icon: <Iconify icon="skill-icons:instagram" size={21} />,
    title: "Live Chat",
    description: "Click here!",
    action: () => {},
  },
  {
    icon: <Iconify icon="logos:telegram" size={21} />,
    title: "Telegram",
    description: "@Medicare.co",
    action: () => {},
  },
  {
    icon: <Iconify icon="skill-icons:twitter" size={21} />,
    title: "Twiiter",
    description: "@medicare",
    action: () => {},
  },
  {
    icon: <Iconify icon="logos:whatsapp-icon" size={27} />,
    title: "Whatsapp",
    description: "+234 816 574 8911",
    action: () => {},
  },
  {
    icon: <Iconify icon="skill-icons:instagram" size={21} />,
    title: "Instagram",
    description: "@medicare",
    action: () => {},
  },
];

const HelpSupport = () => {
  return (
    <ScrollView className="flex-1 h-full w-full py-12 px-4 bg-white ">
      <View className="flex-1 h-full w-full items-center space-y-3   pb-28 ">
        <Image
          source={require("../../../../assets/images/help.png")}
          className="w-[290px] h-[190px] "
          alt="Delete Account"
        />
        <View
          className="w-full"
          style={{
            rowGap: 36,
          }}
        >
          <View className="w-full items-center space-y-2  px-4">
            <Text
              className="text-base text-mainBlack "
              style={[globalStyles.meduim_text]}
            >
              How can we assist you?
            </Text>
            <Text
              className="text-center text-sm text-neutral "
              style={[globalStyles.meduim_text]}
            >
              We at Medicare are dedicated to giving you the best experience
              imaginable. We are available to assist you if you have any
              questions, worries, or problems.
            </Text>
          </View>
          <View>
            <FlatList
              data={options}
              renderItem={({ item }) => <SupportBox {...item} />}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={{
                rowGap: 24,
              }}
              columnWrapperStyle={{
                columnGap: 24,
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HelpSupport;

type Props = {
  icon: React.JSX.Element;
  title: string;
  description: string;
  action: () => void;
};

const SupportBox: React.FC<Props> = ({ icon, title, description, action }) => {
  return (
    <View className="flex-1 bg-primaryGray items-center py-[14px] space-y-3 rounded-[14px] ">
      {icon}
      <View className="w-full items-center space-y-[2px]">
        <Text
          className="text-base text-mainBlack "
          style={[globalStyles.regular_text]}
        >
          {title}
        </Text>
        <Text
          className="text-sm text-neutral"
          style={[globalStyles.regular_text]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};
