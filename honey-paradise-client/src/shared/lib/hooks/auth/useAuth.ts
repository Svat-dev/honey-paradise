import { useAuthStore } from "@/shared/store/auth/auth.store";

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useAuthStore(state => [state.isAuthenticated, state.setIsAuthenticated]);

	const auth = () => setIsAuthenticated(true);
	const exit = () => setIsAuthenticated(false);

	return {
		isAuthenticated,
		auth,
		exit,
	};
};
