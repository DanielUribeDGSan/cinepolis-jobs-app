import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const LogoJobs = () => {
  return (
    <Image
      source={require("@/assets/images/logos/logo-black.png")}
      placeholder={{ blurhash }}
      contentFit="contain"
      transition={1000}
      style={styles.image}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: wp("70%"),
    height: hp("10%"),
    alignSelf: "center",
    objectFit: "contain",
  },
});

export default LogoJobs;
