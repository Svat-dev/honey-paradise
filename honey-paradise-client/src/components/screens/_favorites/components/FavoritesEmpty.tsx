import { Button } from "@/components/ui/common";
import { EnumAppRoute } from "@/shared/lib/constants/routes";
import { m } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FavoritesEmpty = () => {
	const t = useTranslations("global.favorites.content");
	const { push } = useRouter();

	return (
		<m.div
			initial={{ opacity: 0, scale: 0.95, translateY: "-50%" }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4, delay: 0.3 }}
			className="absolute top-1/2 -translate-y-1/2 self-center flex flex-col items-center"
		>
			<Image src="/assets/empty-favorites-icon.webp" alt="Фото" width={200} height={200} priority />

			<p className="font-semibold text-lg">{t("empty.p1")}</p>

			<p className="text-muted mb-2">{t("empty.p2")}</p>

			<div className="w-full flex items-center justify-between px-1">
				<Button variant="outline" title={t("labels.toCatalog")} onClick={() => push(EnumAppRoute.CATALOG)}>
					{t("empty.toCatalog")}
				</Button>

				<Button variant="outline" title={t("labels.toHome")} onClick={() => push(EnumAppRoute.INDEX)}>
					{t("empty.toHome")}
				</Button>
			</div>
		</m.div>
	);
};

export { FavoritesEmpty };
