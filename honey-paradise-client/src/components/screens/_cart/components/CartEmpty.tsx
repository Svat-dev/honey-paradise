import { Button } from "@/components/ui/common";
import { EnumAppRoute } from "@/shared/lib/constants/routes";
import Image from "next/image";
import { m } from "motion/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const CartEmpty = () => {
	const t = useTranslations("global.cart.content.empty");
	const { push } = useRouter();

	return (
		<m.div
			initial={{ opacity: 0, scale: 0.95, translateY: "-50%" }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4, delay: 0.3 }}
			className="absolute top-1/2 -translate-y-1/2 self-center flex flex-col items-center"
		>
			<Image src="/assets/empty-cart-icon.webp" alt="Фото" width={200} height={200} priority />

			<p className="font-semibold text-lg">{t("title")}</p>

			<p className="text-muted text-center mb-2">{t.rich("text", { br: () => <br /> })}</p>

			<div className="w-full flex items-center justify-between px-1">
				<Button variant="outline" title={t("toCatalog")} onClick={() => push(EnumAppRoute.CATALOG)}>
					{t("toCatalog")}
				</Button>

				<Button variant="outline" title={t("toFavorites")} onClick={() => push(EnumAppRoute.FAVORITES)}>
					{t("toFavorites")}
				</Button>
			</div>
		</m.div>
	);
};

export { CartEmpty };
