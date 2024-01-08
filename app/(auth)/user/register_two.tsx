import { View } from "react-native";
import React, { useEffect } from "react";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import Loader from "../../../components/Common/Loader";
import { getCountries } from "../../../redux/slices/app/country";
import { RegisterData } from "../../../utils/interface";
import ProfileInfo from "../../../components/Auth/UserRegister/ProfileInfo";
import { postSignUp } from "../../../redux/slices/user/signup";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import * as FileSystem from "expo-file-system";

const CreateAccountUser = () => {
  const { loading, data } = useAppSelector((state) => state.country);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data) {
      dispatch(getCountries());
    }
  }, [data]);

  const handleRegister = async (body: RegisterData) => {
    // create avatar
    const avatar = createAvatar(initials, {
      seed: `${body.first_name} ${body.last_name}`,
      clip: true,
    });
    const dataURI = avatar.toString();
    const fileUri = FileSystem.documentDirectory + "avatar.svg";
    await FileSystem.writeAsStringAsync(fileUri, dataURI, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const formData = new FormData();

    Object.keys(body).forEach((key) => {
      if (key !== "address") {
        formData.append(key, body[key as keyof RegisterData]);
      } else {
        Object.keys(body.address).forEach((k) => {
          formData.append(
            `address.${k}`,
            body.address[k as keyof RegisterData["address"]] as string
          );
        });
      }
    });

    formData.append("avatar", {
      uri: fileUri,
      name: "avatar.svg",
      type: "image/svg",
    } as any);

    const data = await dispatch(postSignUp(formData));
    return data;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View className="bg-white relative  flex-1">
      <ProfileInfo countries={data} handleRegister={handleRegister} />
    </View>
  );
};

export default CreateAccountUser;
