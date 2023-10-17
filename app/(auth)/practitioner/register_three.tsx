import { Text, View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import { globalStyles } from "../../../constants/styles";
import InfoTextBox from "../../../components/Common/InfoTextBox";
import Button from "../../../components/Common/Button";
import { router } from "expo-router";
import {
  Certification,
  Education,
  Experience,
  Licence,
  PractitionerRegisterData,
} from "../../../utils/interface";
import {
  postPractitionerRequestOTP,
  postPractitionerSignUp,
  postPractitionerUploadKycImages,
} from "../../../redux/slices/practitioner/practitioner_signup";
import { messageAlert } from "../../../components/Common/Alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  postAddPractitionerCertification,
  postAddPractitionerEducation,
  postAddPractitionerExperience,
  postAddPractitionerLicence,
} from "../../../redux/slices/practitioner/practitioner_portfolio";

const CreateAccountPractitioner = () => {
  const { files, data: practitioner } = useAppSelector(
    (state) => state.practitionerRegister
  );

  const { certifications, licences, educations, experiences } = useAppSelector(
    (state) => state.practitionerPortfolio
  );

  const [isSubmitting, setSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    setSubmitting(true);
    const body: PractitionerRegisterData = {
      ...practitioner,
      address: {
        ...practitioner.address,
        city_id: Number(practitioner.address.city_id),
        state_id: Number(practitioner.address.state_id),
        country_id: Number(practitioner.address.country_id),
      },
    };
    const response = await dispatch(postPractitionerSignUp(body));
    if (response.error) {
      setSubmitting(false);
      messageAlert(
        "Error",
        (response?.payload && response?.payload[0]?.error) ||
          "Something went wrong"
      );
      return;
    }

    const token = await AsyncStorage.getItem("practitionerToken");
    if (!token) {
      setSubmitting(false);
      messageAlert("Error", "Invalid or expired token");
      return;
    }

    await handleSubmitCertifications(token);
    await handleSubmitLicences(token);
    await handleSubmitEducations(token);
    await handleSubmitExperiences(token);
    await handleSubmitMedia(token);
    const res = await dispatch(
      postPractitionerRequestOTP({ email: response.payload })
    );

    if (res.error) {
      setSubmitting(false);
      messageAlert(
        "Error",
        (res?.payload && res?.payload[0]?.error) || "Something went wrong"
      );
      return;
    }

    setSubmitting(false);
    router.push("/(auth)/practitioner/verify");
  };

  const handleSubmitCertifications = async (token: string) => {
    certifications.forEach(async (certification) => {
      const body = new FormData();

      Object.keys(certification).forEach((key) => {
        if (key !== "certificate_doc") {
          body.append(key, certification[key as keyof Certification]);
        } else {
          const doc = certification[key as keyof Certification];
          const file = {
            uri: doc.uri,
            type: doc.mimetype,
            name: doc.name,
          };
          body.append(key, file as any);
        }
      });

      const response = await dispatch(
        postAddPractitionerCertification({ body, token })
      );
      if (response.error) {
        setSubmitting(false);
        console.log("here");
        console.log(response);
        messageAlert(
          "Error",
          (response?.payload && response?.payload[0]?.error) ||
            "Something went wrong"
        );
        return;
      }
    });
  };

  const handleSubmitLicences = async (token: string) => {
    licences.forEach(async (licence) => {
      const body = new FormData();

      Object.keys(licence).forEach((key) => {
        if (key !== "licence_doc") {
          body.append(key, licence[key as keyof Licence]);
        } else {
          const doc = licence[key as keyof Licence];
          const file = {
            uri: doc.uri,
            type: doc.mimetype,
            name: doc.name,
          };
          body.append(key, file as any);
        }
      });

      const response = await dispatch(
        postAddPractitionerLicence({ body, token })
      );
      if (response.error) {
        setSubmitting(false);
        messageAlert(
          "Error",
          (response?.payload && response?.payload[0]?.error) ||
            "Something went wrong"
        );
        return;
      }
    });
  };

  const handleSubmitEducations = async (token: string) => {
    educations.forEach(async (education) => {
      const body: Education = {
        ...education,
        country_id: Number(education.country_id),
      };
      const response = await dispatch(
        postAddPractitionerEducation({ body, token })
      );
      if (response.error) {
        setSubmitting(false);
        messageAlert(
          "Error",
          (response?.payload && response?.payload[0]?.error) ||
            "Something went wrong"
        );
        return;
      }
    });
  };

  const handleSubmitExperiences = async (token: string) => {
    experiences.forEach(async (experience) => {
      const body: Experience = {
        ...experience,
        country_id: Number(experience.country_id),
      };
      const response = await dispatch(
        postAddPractitionerExperience({ body, token })
      );
      if (response.error) {
        setSubmitting(false);
        messageAlert(
          "Error",
          (response?.payload && response?.payload[0]?.error) ||
            "Something went wrong"
        );
        return;
      }
    });
  };

  const handleSubmitMedia = async (token: string) => {
    const body = new FormData();

    const hasFile = Object.keys(files).find(
      (key) => files[key as keyof typeof files] !== undefined
    );

    if (!hasFile) {
      return;
    }

    Object.keys(files).forEach((key) => {
      const image = files[key as keyof typeof files];
      if (image !== undefined) {
        const file = {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        };
        body.append(key, file as any);
      }
    });

    const response = await dispatch(
      postPractitionerUploadKycImages({ body, token })
    );
    if (response.error) {
      setSubmitting(false);
      messageAlert(
        "Error",
        (response?.payload && response?.payload[0]?.error) ||
          "Something went wrong"
      );
      return;
    }
  };

  const first_check: boolean = files.kyc_image;
  const second_check: boolean =
    practitioner.nin || files.international_passport || files.driving_licence;

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4 space-y-10">
        <View className="flex justify-center px-5 items-center space-y-2">
          <Text
            className="text-2xl text-center"
            style={[globalStyles.semibold_text]}
          >
            Weldone! You are almost done
          </Text>
          <Text
            className="text-center text-sm "
            style={[globalStyles.regular_text]}
          >
            To complete registration you have to take a selfie and upload a
            document for user verification
          </Text>
        </View>
        <View
          className="px-4 py-5 bg-primaryGray rounded-lg "
          style={{
            rowGap: 16,
          }}
        >
          <InfoTextBox
            text="Take a Selfie"
            action={() => router.push("/practitioner/selfie")}
            checked={first_check}
          />
          <InfoTextBox
            text="Upload Document"
            action={() => router.push("/(auth)/practitioner/options")}
            checked={second_check}
          />
        </View>
        <View className="!mt-20">
          <Button
            text="Finish"
            disabled={!second_check}
            action={handleSubmit}
            loading={isSubmitting}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateAccountPractitioner;
