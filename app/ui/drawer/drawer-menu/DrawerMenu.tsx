import { MenuScreen } from "@/app/screens/menu/MenuScreen";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { createStaticNavigation } from "@react-navigation/native";
import { Text } from "react-native";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <Text>Menu</Text>
    </DrawerContentScrollView>
  );
}

export const DrawerMenu = createDrawerNavigator({
  drawerContent: (props) => <CustomDrawerContent {...props} />,
  screens: {
    Home: MenuScreen,
  },
});

export const NavigationDrawer = createStaticNavigation(DrawerMenu);
