import { createJSONStorage, persist } from "zustand/middleware";

import { create } from "zustand";
import type { IAuthStore } from "../types/auth-store.type";

export const authStore = create(
	persist<IAuthStore>(
		set => ({
			isAuthenticated: false,
			setIsAuthenticated: value => set({ isAuthenticated: value }),
		}),
		{
			name: "auth",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
