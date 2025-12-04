import * as SecureStore from "expo-secure-store";
import { User } from "../../types/User";

const USER_KEY = "userData";

export const userStorage = {
  async saveUser(user: Partial<User>) {
    try {
      const isAvailable = await SecureStore.isAvailableAsync();
      if (!isAvailable) {
        console.warn("SecureStore not available");
        return false;
      }
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("Error saving user:", error);
      return false;
    }
  },

  async getUser(): Promise<Partial<User> | null> {
    try {
      const isAvailable = await SecureStore.isAvailableAsync();
      if (!isAvailable) return null;

      const userData = await SecureStore.getItemAsync(USER_KEY);
      if (!userData) return null;

      return JSON.parse(userData) as Partial<User>;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  },

  async clearUser() {
    try {
      await SecureStore.deleteItemAsync(USER_KEY);
    } catch (error) {
      console.error("Error clearing user:", error);
    }
  },

  async updateUserEmail(email: string) {
    try {
      const currentUser = await this.getUser();
      const updatedUser = {
        ...currentUser,
        userName: email,
      };
      return await this.saveUser(updatedUser);
    } catch (error) {
      console.error("Error updating user email:", error);
      return false;
    }
  },
};
