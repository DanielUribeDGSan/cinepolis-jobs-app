import React, { useRef, useState, useMemo, Children } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface SlideData {
  id: number;
  image: number | string;
}

interface OnboardingSliderProps {
  slides: SlideData[];
  children?: React.ReactNode;
}

const OnboardingSlider: React.FC<OnboardingSliderProps> = ({
  slides,
  children,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const carouselRef = useRef<any>(null);

  const mappedChildren = useMemo(() => {
    if (!children) return [];

    const childrenArray = Children.toArray(children);
    if (childrenArray.length === 0) return [];

    return slides.map((_, index) => {
      if (index < childrenArray.length) {
        return childrenArray[index];
      }

      return childrenArray[childrenArray.length - 1];
    });
  }, [slides, children]);

  const renderSlide = ({ item }: { item: SlideData }) => {
    return (
      <View style={styles.slideContainer}>
        <Image
          source={
            typeof item.image === "string" ? { uri: item.image } : item.image
          }
          style={styles.backgroundImage}
          contentFit="cover"
          priority="high"
          cachePolicy="memory-disk"
        />

        <View style={styles.darkOverlay} />
      </View>
    );
  };

  return (
    <View>
      <Carousel
        ref={carouselRef}
        loop
        width={wp("100%")}
        height={hp("55%")}
        data={slides}
        scrollAnimationDuration={1000}
        autoPlay={true}
        autoPlayInterval={4000}
        onSnapToItem={setCurrentIndex}
        renderItem={renderSlide}
      />

      <View style={styles.contentOverlay}>
        <View style={styles.textContainer}>{mappedChildren[currentIndex]}</View>

        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  slideContainer: {
    width: wp("100%"),
    height: hp("100%"),
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  darkOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  contentOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: hp("2%"),
    paddingBottom: hp("0%"),
    justifyContent: "flex-end",
  },
  textContainer: {
    marginBottom: hp("2%"),
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: hp("7%"),
  },
  paginationDot: {
    width: hp("0.7%"),
    height: hp("0.7%"),
    borderRadius: hp("1%"),
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: hp("0.5%"),
  },
  paginationDotActive: {
    backgroundColor: "#FFFFFF",
    width: hp("5%"),
  },
});

export default OnboardingSlider;
