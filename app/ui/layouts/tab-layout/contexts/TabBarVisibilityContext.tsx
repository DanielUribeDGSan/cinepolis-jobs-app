import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface TabBarVisibilityContextType {
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
  addFocusedInput: () => void;
  removeFocusedInput: () => void;
  hasFocusedInput: boolean;
}

const TabBarVisibilityContext = createContext<
  TabBarVisibilityContextType | undefined
>(undefined);

export const TabBarVisibilityProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [_focusedInputsCount, setFocusedInputsCount] = useState(0);

  const setVisible = useCallback((visible: boolean) => {
    setIsVisible(visible);
  }, []);

  const addFocusedInput = useCallback(() => {
    setFocusedInputsCount((prev) => {
      const newCount = prev + 1;
      // Si hay al menos un input enfocado, ocultar la tab bar
      if (newCount === 1) {
        setIsVisible(false);
      }
      return newCount;
    });
  }, []);

  const removeFocusedInput = useCallback(() => {
    setFocusedInputsCount((prev) => {
      const newCount = Math.max(0, prev - 1);
      // Si no hay inputs enfocados, mostrar la tab bar
      if (newCount === 0) {
        setIsVisible(true);
      }
      return newCount;
    });
  }, []);

  // focusedInputsCount se usa internamente en los callbacks, no necesita ser expuesto

  return (
    <TabBarVisibilityContext.Provider
      value={{
        isVisible,
        setVisible,
        addFocusedInput,
        removeFocusedInput,
        hasFocusedInput: _focusedInputsCount > 0,
      }}
    >
      {children}
    </TabBarVisibilityContext.Provider>
  );
};

export const useTabBarVisibility = () => {
  const context = useContext(TabBarVisibilityContext);
  if (context === undefined) {
    // Retornar valores por defecto si el contexto no está disponible
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return {
      isVisible: true,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setVisible: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addFocusedInput: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeFocusedInput: () => {},
      hasFocusedInput: false,
    };
  }
  return context;
};
