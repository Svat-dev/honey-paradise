import { Title } from "@/components/ui/common";
import { getTranslations } from "next-intl/server";
import { FavoritesContent } from "./components/FavoritesContent";

const Favorites = async () => {
	const t = await getTranslations("global.favorites.content");

	return (
		<article className="relative w-full my-6 mx-10">
			<Title size="lg" className="font-bold">
				{t("title")}
			</Title>

			<p className="ml-1 mb-4 text-muted">{t("description")}</p>

			<FavoritesContent />
		</article>
	);
};

export { Favorites };
