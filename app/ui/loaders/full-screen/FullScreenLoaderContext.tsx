import React, { createContext, useContext, useState, useCallback } from "react";

interface FullScreenLoaderContextType {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

const FullScreenLoaderContext = createContext<
  FullScreenLoaderContextType | undefined
>(undefined);

export const FullScreenLoaderProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLoadingCount] = useState(0);

  const showLoader = useCallback(() => {
    setLoadingCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 1) {
        setIsLoading(true);
      }
      return newCount;
    });
  }, []);

  const hideLoader = useCallback(() => {
    setLoadingCount((prev) => {
      const newCount = Math.max(0, prev - 1);
      if (newCount === 0) {
        setIsLoading(false);
      }
      return newCount;
    });
  }, []);

  return (
    <FullScreenLoaderContext.Provider
      value={{ isLoading, showLoader, hideLoader }}
    >
      {children}
    </FullScreenLoaderContext.Provider>
  );
};

export const useFullScreenLoader = () => {
  const context = useContext(FullScreenLoaderContext);
  if (!context) {
    throw new Error(
      "useFullScreenLoader must be used within a FullScreenLoaderProvider"
    );
  }
  return context;
};
