/**
 * useAuthStore
 *
 * A Zustand store to store and handle
 * auth state globally
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: string | null;
  checking: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  checking: true,

  checkAuth: async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/auth/check",
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!res.ok) {
        set({ user: null });
        return;
      }

      const data = await res.json();
      set({ user: data.username, checking: false });
      return data.username;
    } catch (err) {
      console.error("Auth check failed:", err);
      set({ user: null, checking: false });
    }
  },

  logout: async () => {
    try {
      await fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      set({ user: null });
    }
  },

  setUser: (user) => set({ user }),
}));
