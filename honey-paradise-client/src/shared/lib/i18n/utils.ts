"use server";

import { DEFAULT_LANGUAGE, EnumLanguages } from "./";

import { EnumStorageTokens } from "@constants/base";
import { cookies } from "next/dist/server/request/cookies";

export async function getCurrentLanguage() {
	const cookiesStore = await cookies();

	const language = cookiesStore.get(EnumStorageTokens.LANGUAGE)?.value ?? DEFAULT_LANGUAGE;

	return language;
}

export async function setLanguage(language: EnumLanguages) {
	const cookiesStore = await cookies();

	return cookiesStore.set(EnumStorageTokens.LANGUAGE, language);
}
