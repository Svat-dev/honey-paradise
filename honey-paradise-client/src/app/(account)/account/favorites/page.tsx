import type { Metadata, NextPage } from "next"
import { getTranslations } from "next-intl/server"

import { Favorites } from "@/components/screens/_favorites/Favorites"
import { NO_INDEX_PAGE } from "@/shared/lib/constants/base"
import { getMetadata } from "@/shared/lib/utils/base"

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("global")

	return {
		...(await getMetadata({
			title: t("favorites.title"),
			description: t("favorites.description", { title: t("logo") }),
			index: false
		})),
		...NO_INDEX_PAGE
	}
}

const FavoritesPage: NextPage = () => {
	return <Favorites />
}

export default FavoritesPage
