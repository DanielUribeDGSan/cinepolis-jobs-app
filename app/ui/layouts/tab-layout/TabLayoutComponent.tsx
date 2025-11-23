import { View } from "react-native";
import HeaderTop from "../../header/HeaderTop";
import { Tabs } from "expo-router";
import TabBarIcon from "../../icons/TabBarIcon";
import { colors } from "@/app/utils/sizes/constants/colors";
import AnimatedTabBar from "./components/AnimatedTabBar";

export default function TabLayoutComponent() {
  return (
    <>
      <View className="flex-1 bg-white">
        <HeaderTop />
        <Tabs
          tabBar={(props) => <AnimatedTabBar {...props} />}
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.gray,
          }}
        >
          <Tabs.Screen
            name="TabHomeScreen"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name="home" color={color} focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="TabMyVacancies"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name="folder-open"
                  color={color}
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="TabProfileScreen"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name="user" color={color} focused={focused} />
              ),
            }}
          />
        </Tabs>
      </View>
    </>
  );
}
