import { EnumAuthTokens } from "@constants/base/data.const";
import Cookies from "js-cookie";

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumAuthTokens["ACCESS_TOKEN"]);
	return accessToken || null;
};

export const saveTokenToStorage = (accessToken: string) => {
	Cookies.set(EnumAuthTokens["ACCESS_TOKEN"], accessToken, {
		domain: "localhost",
		sameSite: "strict",
		expires: 1,
	});
};

export const removeTokenFromStorage = () => {
	Cookies.remove(EnumAuthTokens["ACCESS_TOKEN"]);
};
