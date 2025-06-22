import { EnumPasswordRecoverTabs } from "@/components/screens/_password-recovery/types/type";

export enum EnumConfirmationTypes {
	EMAIL = "emailConfirmation",
	PHONE = "phoneConfirmation",
	SIGN_IN = "signInConfirmation",
}

export enum EnumAppRoute {
	INDEX = "/",

	AUTH = "/auth",
	SIGN_IN = `${AUTH}/sign-in`,
	SIGN_UP = `${AUTH}/sign-up?active_tab=main`,

	PASSWORD_RECOVERY = `${AUTH}/password-recovery`,
	RESET_PASSWORD = `${PASSWORD_RECOVERY}?type=${EnumPasswordRecoverTabs.RESET}`,
	CHANGE_PASSWORD = `${PASSWORD_RECOVERY}?type=${EnumPasswordRecoverTabs.CHANGE}`,

	CONFIRMATION = `${AUTH}/confirmation`,
	EMAIL_CONFIRMATION = `${CONFIRMATION}?type=${EnumConfirmationTypes.EMAIL}`,
	SIGN_IN_CONFIRMATION = `${CONFIRMATION}?type=${EnumConfirmationTypes.SIGN_IN}`,

	DOCS = "/docs",
	PRIVACY_POLICY = `${DOCS}/privacy-policy`,
	COOKIE_POLICY = `${DOCS}/cookie-policy`,

	NOT_FOUND = "/not-found",
	NOT_AUTH = "/not-auth",
}
