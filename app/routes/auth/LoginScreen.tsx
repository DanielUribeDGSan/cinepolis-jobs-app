import FormLogin from "@/app/screens/login/components/FormLogin";
import { LayoutAppBar } from "@/app/ui/layouts/LayoutAppBar";

import { Image } from "expo-image";

import { router } from "expo-router";
import { Text, View } from "react-native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function LoginScreen() {
  const goToRegister = () => {
    router.push("/routes/auth/RegisterScreen" as any);
  };

  return (
    <LayoutAppBar title="Login">
      <FormLogin />
    </LayoutAppBar>
  );
}
