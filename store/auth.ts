// import { defineStore } from "pinia";
import type { UserData } from "../types/socialResponse";

export const useAuthStore = defineStore("auth", () => {
  // Use a cookie to persist the user session across refreshes
  const user = useCookie<UserData | null>("auth_user", {
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  const token = computed(() => user.value?.token || null);
  const isLoggedIn = computed(() => !!user.value);

  // Actions
  function setUser(userData: UserData) {
    user.value = userData;
    navigateTo("/");
  }

  function clearUser() {
    user.value = null;
    
  }

  return {
    user,
    token,
    isLoggedIn,
    setUser,
    clearUser,
  };
});
