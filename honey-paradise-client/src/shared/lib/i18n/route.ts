import { DEFAULT_LANGUAGE, EnumLanguages, LANGUAGES } from "./config";

import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

const ruPrefix = String(EnumLanguages.RU);
const enPrefix = String(EnumLanguages.EN);

export const routing = defineRouting({
	locales: LANGUAGES,
	defaultLocale: DEFAULT_LANGUAGE,
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
