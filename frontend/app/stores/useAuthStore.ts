/**
 * useAuthStore
 *
 * A Zustand store to store and handle
 * auth state globally
 */

import { create } from "zustand";

interface AuthState {
  user: string | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

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
      set({ user: data.username });
      return data.username;
    } catch (err) {
      console.error("Auth check failed:", err);
      set({ user: null });
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
