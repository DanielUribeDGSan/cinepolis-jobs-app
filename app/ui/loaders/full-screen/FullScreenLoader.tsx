import React from "react";
import { View, StyleSheet } from "react-native";
import { useFullScreenLoader } from "./FullScreenLoaderContext";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import LogoJobsAnimated from "../../components/images/LogoJobsAnimated";

const FullScreenLoader: React.FC = () => {
  const { isLoading } = useFullScreenLoader();

  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View
        className="flex-1 justify-center items-center"
        style={styles.container}
      >
        <LogoJobsAnimated
          imageSource={require("@/assets/images/logos/logo-blanco.svg")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    elevation: 9999,
  },
  container: {
    backgroundColor: "transparent",
    height: hp("100%"),
    width: wp("100%"),
    padding: hp("2%"),
  },
});

export default FullScreenLoader;
