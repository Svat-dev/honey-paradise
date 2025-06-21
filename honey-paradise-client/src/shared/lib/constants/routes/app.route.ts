import { EnumPasswordRecoverTabs } from "@/components/screens/_password-recovery/types/type";

export enum EnumConfirmationTypes {
	EMAIL = "emailConfirmation",
	PHONE = "phoneConfirmation",
	SIGN_IN = "signInConfirmation",
}

export enum EnumAppRoute {
	INDEX = "/",

	AUTH = "/auth",
	SIGN_IN = `${EnumAppRoute.AUTH}/sign-in`,
	SIGN_UP = `${EnumAppRoute.AUTH}/sign-up?active_tab=main`,
	FORGOT_PASSWORD = `${EnumAppRoute.AUTH}/password-recovery?type=${EnumPasswordRecoverTabs.RESET}`,

	CONFIRMATION = `${EnumAppRoute.AUTH}/confirmation`,
	EMAIL_CONFIRMATION = `${EnumAppRoute.CONFIRMATION}?type=${EnumConfirmationTypes.EMAIL}`,
	SIGN_IN_CONFIRMATION = `${EnumAppRoute.CONFIRMATION}?type=${EnumConfirmationTypes.SIGN_IN}`,

	DOCS = "/docs",
	PRIVACY_POLICY = `${EnumAppRoute.DOCS}/privacy-policy`,
	COOKIE_POLICY = `${EnumAppRoute.DOCS}/cookie-policy`,

	NOT_FOUND = "/not-found",
	NOT_AUTH = "/not-auth",
}
