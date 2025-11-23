import { StyleProps } from "@/app/types/Style";
import { Image } from "expo-image";
import React, { useEffect, useMemo } from "react";
import { Animated, StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface LogoJobsAnimatedProps {
  width?: number;
  height?: number;
  imageSource?: string;
  className?: string;
  style?: StyleProps;
}

const LogoJobsAnimated = ({
  width = wp("60%"),
  height = hp("10%"),
  imageSource = require("@/assets/images/logos/logo-black.png"),
  className,
  style,
}: LogoJobsAnimatedProps) => {
  const opacity = useMemo(() => new Animated.Value(1), []);

  useEffect(() => {
    // Crear animación de parpadeo continuo
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    blinkAnimation.start();

    return () => {
      blinkAnimation.stop();
    };
  }, [opacity]);

  return (
    <View className={className ?? ""} style={style}>
      <Animated.View style={{ opacity }}>
        <Image
          source={imageSource}
          contentFit="contain"
          transition={1000}
          style={[styles.image, { width, height }]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    objectFit: "contain",
  },
});

export default LogoJobsAnimated;
