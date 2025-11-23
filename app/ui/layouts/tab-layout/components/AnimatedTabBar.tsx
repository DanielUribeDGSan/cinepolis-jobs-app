import React, { useEffect, useMemo } from "react";
import { Animated, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTabBarVisibility } from "../contexts/TabBarVisibilityContext";
import { colors } from "@/app/utils/sizes/constants/colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import TabBarIcon from "@/app/ui/icons/TabBarIcon";

export default function AnimatedTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { isVisible } = useTabBarVisibility();
  const translateY = useMemo(() => new Animated.Value(0), []);
  const opacity = useMemo(() => new Animated.Value(1), []);

  useEffect(() => {
    if (isVisible) {
      // Animación para mostrar (deslizar hacia arriba)
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.spring(opacity, {
          toValue: 1,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
      ]).start();
    } else {
      // Animación para ocultar (deslizar hacia abajo)
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 150,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.spring(opacity, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
      ]).start();
    }
  }, [isVisible, translateY, opacity]);

  return (
    <Animated.View
      style={[
        styles.tabBar,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // Determinar el icono según la ruta
        let iconName: React.ComponentProps<typeof TabBarIcon>["name"] = "home";
        if (route.name === "TabHomeScreen") {
          iconName = "home";
        } else if (route.name === "TabMyVacancies") {
          iconName = "folder-open";
        } else if (route.name === "TabProfileScreen") {
          iconName = "user";
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <TabBarIcon
              name={iconName}
              color={isFocused ? colors.primary : colors.gray}
              focused={isFocused}
            />
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: hp("3%"),
    left: hp("2%"),
    right: hp("2%"),
    backgroundColor: colors.primary,
    borderRadius: hp("2.5%"),
    height: hp("8%"),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: hp("2%"),
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: hp("0.8%"),
    },
    shadowOpacity: 0.3,
    shadowRadius: hp("1.2%"),
    elevation: 15,
    borderWidth: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
