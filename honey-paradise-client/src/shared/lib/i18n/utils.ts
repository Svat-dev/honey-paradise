"use server";

import { DEFAULT_LANGUAGE, EnumLanguages, LANGUAGES } from "./";

import { EnumStorageKeys } from "@constants/base";
import { cookies } from "next/dist/server/request/cookies";

export async function getCurrentLanguage() {
	const cookiesStore = await cookies();

	const language = cookiesStore.get(EnumStorageKeys.LANGUAGE)?.value ?? DEFAULT_LANGUAGE;

	if (!LANGUAGES.includes(language)) return DEFAULT_LANGUAGE;

	return language;
}

export async function setLanguage(language: EnumLanguages) {
	const cookiesStore = await cookies();

	return cookiesStore.set(EnumStorageKeys.LANGUAGE, language);
}
