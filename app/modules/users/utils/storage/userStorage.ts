import * as SecureStore from "expo-secure-store";

export const tokenStorage = {
  async saveToken(token: string) {
    await SecureStore.setItemAsync("userToken", token);
  },

  async getToken() {
    return await SecureStore.getItemAsync("userToken");
  },

  async clearToken() {
    await SecureStore.deleteItemAsync("userToken");
  },
};
