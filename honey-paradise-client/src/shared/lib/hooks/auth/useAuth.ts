import { authStore } from "@/shared/store/auth/auth.store";

export const useAuth = (defaultValue?: boolean) => {
	const isAuthenticatedState = authStore(state => state.isAuthenticated);
	const isAuthenticated = isAuthenticatedState === undefined ? defaultValue : isAuthenticatedState;
	const setIsAuthenticated = authStore(state => state.setIsAuthenticated);

	const auth = () => setIsAuthenticated(true);
	const exit = () => setIsAuthenticated(false);

	return {
		isAuthenticated,
		auth,
		exit,
	};
};
