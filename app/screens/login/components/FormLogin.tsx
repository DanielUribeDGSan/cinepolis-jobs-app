import React from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";

import LogoJobs from "@/app/ui/components/images/LogoJobs";

import useFormLogin from "../hooks/useFormLogin";
import InputEmail from "@/app/ui/components/inputs/InputEmail";
import InputPassword from "@/app/ui/components/inputs/InputPassword";

import useGetFontSize from "@/app/utils/font-sizes/hooks/useGetFontSize";

const FormLogin = () => {
  const { control, handleSubmit, errors, isValid } = useFormLogin();
  const { fontSize } = useGetFontSize();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1">
        <LogoJobs />

        <View>
          <InputEmail name="email" control={control} label="Email" />
          <InputPassword name="password" control={control} label="password" />
          <InputEmail name="email" control={control} label="Email" />
          <InputPassword name="password" control={control} label="password" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FormLogin;
