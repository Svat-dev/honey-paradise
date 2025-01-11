import { authService } from "@/services/auth.service";
import { API_URL } from "@constants/base/base.const";
import axios, { type CreateAxiosDefaults } from "axios";
import { errorCatch, getContentType } from "./api-helper";
import { getAccessToken, removeTokenFromStorage } from "./auth-helper";

const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: getContentType(),
	withCredentials: true,
};

export const defaultInstance = axios.create(axiosOptions);
export const instance = axios.create(axiosOptions);

instance.interceptors.request.use(config => {
	const accessToken = getAccessToken();

	if (config?.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

	return config;
});

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config;
		const axiosErr = errorCatch(error);

		if (
			(error?.response?.status === 401 || axiosErr.errText === "jwt_expired" || axiosErr.errText === "jwt_must_be_provided") &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;
			try {
				await authService.getNewTokens();
				return instance.request(originalRequest);
			} catch (error) {
				if (axiosErr.errText === "jwt_expired" || axiosErr.errText === "refresh_token_must_be_provided") removeTokenFromStorage();
			}
		}

		throw error;
	}
);
