import { View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PersonCircle from "../../assets/svgs/PersonCircle.svg";
import SignIn from "../../components/Auth/SignIn";
import SignUpOptions from "../../components/Auth";

const AuthPage = () => {
  const [page, setPage] = useState("signin");
  return (
    <SafeAreaView className="flex-1 relative items-center bg-primaryOne">
      <View className="flex-[0.3] w-full h-full items-center justify-center ">
        <PersonCircle />
      </View>
      <View className="absolute w-full h-[70%]  bottom-0 bg-white  rounded-t-[40px] ">
        {page === "signin" && (
          <SignIn handleCreateAccount={() => setPage("register")} />
        )}
        {page === "register" && (
          <SignUpOptions handleSignIn={() => setPage("signin")} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AuthPage;
