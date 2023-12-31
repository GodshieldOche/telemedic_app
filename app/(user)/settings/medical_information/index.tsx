import { View } from "react-native";
import React from "react";
import ProfileListItem from "../../../../components/Common/ProfileListItem";
import { Iconify } from "react-native-iconify";
import { router } from "expo-router";
import { Circle, Path, Svg } from "react-native-svg";
import { ScrollView } from "react-native-gesture-handler";

const MedicalInformation = () => {
  return (
    <View className="flex-1  py-6  bg-white">
      <ScrollView>
        <View
          style={{
            rowGap: 4,
          }}
        >
          <ProfileListItem
            title="Medical History"
            desc="Your personal Medical History"
            icon={
              <Iconify
                icon="ant-design:file-zip-filled"
                size={24}
                color="#8863F2"
              />
            }
            action={() =>
              router.push("/(user)/settings/medical_information/history/")
            }
          />
          <ProfileListItem
            title="Prescriptions"
            desc="See your Prescriptions"
            icon={
              <Iconify icon="mdi:invoice-schedule" size={24} color="#8863F2" />
            }
            action={() =>
              router.push("/(user)/settings/medical_information/prescriptions/")
            }
          />
          <ProfileListItem
            title="Dietary"
            desc="Add a Dietary plan for yourself"
            icon={
              <Iconify icon="ion:fast-food-sharp" size={24} color="#8863F2" />
            }
            action={() => {}}
          />
          <ProfileListItem
            title="Allergies"
            desc="Add your allergies"
            icon={
              <Iconify icon="mdi:allergy-outline" size={24} color="#8863F2" />
            }
            action={() =>
              router.push("/(user)/settings/medical_information/allergies/")
            }
          />
          <ProfileListItem
            title="Vital Signs"
            desc="Set up your vitals"
            icon={
              <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <Circle cx="18" cy="18" r="18" fill="#F2EFFF" />
                <Path
                  d="M25 10H20.82C20.4 8.84 19.3 8 18 8C16.7 8 15.6 8.84 15.18 10H11C10.4696 10 9.96086 10.2107 9.58579 10.5858C9.21071 10.9609 9 11.4696 9 12V26C9 26.5304 9.21071 27.0391 9.58579 27.4142C9.96086 27.7893 10.4696 28 11 28H25C25.5304 28 26.0391 27.7893 26.4142 27.4142C26.7893 27.0391 27 26.5304 27 26V12C27 11.4696 26.7893 10.9609 26.4142 10.5858C26.0391 10.2107 25.5304 10 25 10ZM18 10C18.2652 10 18.5196 10.1054 18.7071 10.2929C18.8946 10.4804 19 10.7348 19 11C19 11.2652 18.8946 11.5196 18.7071 11.7071C18.5196 11.8946 18.2652 12 18 12C17.7348 12 17.4804 11.8946 17.2929 11.7071C17.1054 11.5196 17 11.2652 17 11C17 10.7348 17.1054 10.4804 17.2929 10.2929C17.4804 10.1054 17.7348 10 18 10ZM11 20.46H13.17L16.5 14.08L17.44 21.05L19.93 17.86L22.53 20.46H25V22H21.89L20.07 20.21L16.38 24.92L15.62 19.15L14.11 22H11V20.46Z"
                  fill="#8863F2"
                />
              </Svg>
            }
            action={() => {}}
          />
          <ProfileListItem
            title="Health Insurance"
            desc="Add your health insurance"
            icon={
              <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <Circle cx="18" cy="18" r="18" fill="#F2EFFF" />
                <Path
                  d="M18.1012 8L8 17.1176H10.3883V28H25.3883V17.1176H28L18.1012 8ZM20.3642 24.826H15.6354L16.6271 19.9693C16.0275 19.5158 15.6354 18.833 15.6354 17.9968C15.6354 16.6193 16.6942 15.5306 17.9996 15.5306C19.3058 15.5306 20.3642 16.661 20.3642 18.0385C20.3642 18.8751 19.9721 19.5099 19.3729 19.962L20.3642 24.826Z"
                  fill="#8863F2"
                />
              </Svg>
            }
            action={() =>
              router.push("/(user)/settings/medical_information/insurances/")
            }
          />
          <ProfileListItem
            title="Diagnostic Test Results"
            desc="Add and view your results"
            icon={
              <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <Circle cx="18" cy="18" r="18" fill="#F2EFFF" />
                <Path
                  d="M27 10.0005C27 9.72326 26.8314 9.4987 26.6236 9.4987L26.6223 9.49898V9.49756H16.817V9.50155C16.7179 9.50222 16.623 9.55505 16.5529 9.64854C16.4828 9.74204 16.4432 9.86864 16.4428 10.0008L16.4426 11.8081C16.4424 11.8167 16.4407 11.8244 16.4407 11.8329C16.4407 12.1099 16.6091 12.3345 16.817 12.3347H26.6223L26.6236 12.335C26.8316 12.335 27 12.1102 27 11.8332V10.0005ZM27 14.2469C27 13.9696 26.8314 13.7451 26.6236 13.7451L26.6223 13.7454V13.7439H16.817V13.7479C16.7179 13.7486 16.623 13.8014 16.5529 13.8949C16.4828 13.9884 16.4432 14.115 16.4428 14.2472L16.4426 16.0548C16.4424 16.0633 16.4407 16.071 16.4407 16.0796C16.4407 16.3566 16.6091 16.5811 16.817 16.5814H26.6223H26.6236C26.8316 16.5814 27 16.3566 27 16.0796V14.2469ZM14.3128 9.99939C14.3128 9.93348 14.3031 9.86821 14.2842 9.80731C14.2653 9.7464 14.2376 9.69107 14.2026 9.64446C14.1677 9.59785 14.1262 9.56089 14.0805 9.53568C14.0348 9.51048 13.9859 9.49752 13.9364 9.49756C13.9272 9.49756 13.9185 9.50041 13.9095 9.50126H9.4033C9.39432 9.50041 9.38556 9.49756 9.37637 9.49756C9.16842 9.49756 9 9.7224 9 9.99939V16.0793C9 16.3563 9.16842 16.5811 9.37637 16.5811H13.9364C14.1444 16.5811 14.3128 16.3563 14.3128 16.0793V9.99939ZM27 19.9218C27 19.6446 26.8314 19.42 26.6236 19.42L26.6223 19.4203V19.4189H16.817V19.4229C16.7179 19.4235 16.623 19.4764 16.5529 19.5698C16.4828 19.6633 16.4432 19.7899 16.4428 19.9221L16.4426 21.7297C16.4424 21.7383 16.4407 21.7459 16.4407 21.7545C16.4407 22.0315 16.6091 22.2563 16.817 22.2563H26.6223H26.6236C26.8316 22.2563 27 22.0315 27 21.7545V19.9218ZM27 24.1682C27 23.8909 26.8314 23.6664 26.6236 23.6664L26.6223 23.6667V23.6652H16.817V23.6692C16.7179 23.6699 16.623 23.7227 16.5529 23.8162C16.4828 23.9097 16.4432 24.0363 16.4428 24.1685L16.4426 25.9758C16.4424 25.9843 16.4407 25.992 16.4407 26.0006C16.4407 26.2776 16.6091 26.5024 16.817 26.5024H26.6223H26.6236C26.8316 26.5024 27 26.2776 27 26.0006V24.1682ZM14.3128 19.9207C14.3128 19.6434 14.1444 19.4186 13.9364 19.4186C13.9272 19.4186 13.9185 19.4214 13.9095 19.4223H9.4033C9.39432 19.4214 9.38556 19.4186 9.37637 19.4186C9.16842 19.4186 9 19.6434 9 19.9207V26.0006C9 26.2776 9.16863 26.5024 9.37637 26.5024H13.9364C14.1444 26.5024 14.3128 26.2776 14.3128 26.0006V19.9207Z"
                  fill="#8863F2"
                />
              </Svg>
            }
            action={() =>
              router.push("/(user)/settings/medical_information/test_results/")
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MedicalInformation;
