export interface IAuthStore {
	isAuthenticated: boolean | undefined;
	setIsAuthenticated: (value: boolean) => void;
}
