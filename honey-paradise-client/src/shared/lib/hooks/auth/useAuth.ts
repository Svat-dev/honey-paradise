import { authStore } from "@/shared/store/auth/auth.store";

export const useAuth = (defaultValue: boolean = false) => {
	const isAuthenticated = authStore(state => state.isAuthenticated) || defaultValue;
	const setIsAuthenticated = authStore(state => state.setIsAuthenticated);

	const auth = () => setIsAuthenticated(true);
	const exit = () => setIsAuthenticated(false);

	return {
		isAuthenticated,
		auth,
		exit,
	};
};
