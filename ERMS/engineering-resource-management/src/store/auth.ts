import create from "zustand";
import { loginUser } from "../lib/api";

interface User {
  id: string;
  name: string;
  role: "manager" | "engineer";
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  login: async (email, password) => {
    const data = await loginUser(email, password);
    // Expect backend to respond with { token: "...", user: { id, name, role } }
    set({ token: data.token, user: data.user });
  },

  logout: () => set({ token: null, user: null }),
}));
