import { useEffect, useState } from "react";
import { User } from "../types/User";
import { userStorage } from "../utils/storage/userStorage";

export const useUserSession = () => {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      setIsLoading(true);
      const userData = await userStorage.getUser();
      setUser(userData);
      // Consideramos que hay sesión si hay userName o token
      setIsAuthenticated(!!(userData?.userName || userData?.token));
    } catch (error) {
      console.error("Error checking session:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSession = async () => {
    await userStorage.clearUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    checkSession,
    clearSession,
  };
};
