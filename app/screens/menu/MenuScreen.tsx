import { useDrawer } from "@/app/ui/drawer/DrawerContext";
import { colors } from "@/app/utils/sizes/constants/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const MenuScreen = () => {
  const { closeDrawer } = useDrawer();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Menú</Text>
        <TouchableOpacity
          onPress={closeDrawer}
          style={styles.closeButton}
          activeOpacity={0.7}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Contenido del menú</Text>
        {/* Aquí puedes agregar más contenido del menú */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("3%"),
    paddingTop: hp("5%"),
    backgroundColor: colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  title: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    color: colors.white,
  },
  closeButton: {
    width: hp("4%"),
    height: hp("4%"),
    borderRadius: hp("2%"),
    backgroundColor: colors.quinary,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: hp("2%"),
    color: colors.white,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: wp("5%"),
  },
  contentText: {
    fontSize: hp("2%"),
    color: colors.black,
  },
});
