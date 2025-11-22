import { StyleSheet, View } from "react-native";
import HeaderTop from "../../header/HeaderTop";
import { Tabs } from "expo-router";
import TabBarIcon from "../../icons/TabBarIcon";
import { colors } from "@/app/utils/sizes/constants/colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { useTabLayoutComponent } from "./hooks/useTabLayoutComponent";

export default function TabLayoutComponent() {
  const { title } = useTabLayoutComponent();

  return (
    <>
      <View className="flex-1 bg-white">
        <HeaderTop title={title} />
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.gray,
          }}
        >
          <Tabs.Screen
            name="index"
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

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: hp("3.4%"),
    left: hp("2%"),
    right: hp("2%"),
    backgroundColor: colors.primary,
    borderRadius: hp("2.5%"),
    height: hp("8%"),
    paddingBottom: hp("0%"),
    paddingTop: hp("0%"),
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
});
