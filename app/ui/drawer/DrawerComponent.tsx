import { MenuScreen } from "@/app/screens/menu/MenuScreen";
import { colors } from "@/app/utils/sizes/constants/colors";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDrawer } from "./DrawerContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ANIMATION_DURATION = 300;

export const DrawerComponent: React.FC = () => {
  const { isOpen, closeDrawer } = useDrawer();
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    // Cancelar animación anterior si existe
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }

    if (isOpen) {
      // Reinicializar valores de animación al abrir
      slideAnim.setValue(-SCREEN_WIDTH);
      backdropOpacity.setValue(0);
      setModalVisible(true);

      // Pequeño delay para asegurar que el Modal esté visible antes de animar
      requestAnimationFrame(() => {
        animationRef.current = Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
        ]);
        animationRef.current.start(() => {
          animationRef.current = null;
        });
      });
    } else if (modalVisible) {
      // Animar el cierre
      animationRef.current = Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -SCREEN_WIDTH,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]);
      animationRef.current.start(() => {
        // Ocultar el Modal solo después de que la animación termine
        setModalVisible(false);
        animationRef.current = null;
      });
    }

    // Cleanup: cancelar animación si el componente se desmonta
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, [isOpen, modalVisible, slideAnim, backdropOpacity]);

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="none"
      onRequestClose={closeDrawer}
    >
      <View style={styles.container}>
        {/* Backdrop */}
        <TouchableOpacity
          activeOpacity={1}
          style={styles.backdrop}
          onPress={closeDrawer}
        >
          <Animated.View
            style={[
              styles.backdropOverlay,
              {
                opacity: backdropOpacity,
              },
            ]}
          />
        </TouchableOpacity>

        {/* Drawer Content */}
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={styles.drawerContent}>
            <MenuScreen />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerContent: {
    flex: 1,
  },
});
