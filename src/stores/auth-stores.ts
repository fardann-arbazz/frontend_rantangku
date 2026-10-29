import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { AuthState, User } from "@/types/auth-types";

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isInitialized: false,
      isLoading: true,

      setUser: (user: User | null) =>
        set(
          {
            user,
            isAuthenticated: user !== null,
          },
          false,
          "auth/setUser",
        ),

      setInitialized: () =>
        set(
          {
            isInitialized: true,
            isLoading: false,
          },
          false,
          "auth/setInitialized",
        ),

      logout: () =>
        set(
          {
            user: null,
            isAuthenticated: false,
          },
          false,
          "auth/logout",
        ),
    }),
    { name: "AuthStore" },
  ),
);

// selectors
export const selectUser = (s: AuthState) => s.user;
export const selectIsAuthenticated = (s: AuthState) => s.isAuthenticated;
export const selectIsInitialized = (s: AuthState) => s.isInitialized;
export const selectIsLoading = (s: AuthState) => s.isLoading;
export const selectRole = (s: AuthState) => s.user?.role;
