export interface IAuthStore extends IActions {
	isAuthenticated: boolean | undefined;
}

interface IActions {
	setIsAuthenticated: (value: boolean) => void;
}
