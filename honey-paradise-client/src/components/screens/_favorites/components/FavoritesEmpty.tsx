import { m } from "motion/react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/common"
import { EnumAppRoute } from "@/shared/lib/constants/routes"

const FavoritesEmpty = () => {
	const t = useTranslations("global.favorites.content")
	const { push } = useRouter()

	return (
		<m.div
			initial={{ opacity: 0, scale: 0.95, translateY: "-50%" }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4, delay: 0.3 }}
			className="absolute top-1/2 flex -translate-y-1/2 flex-col items-center self-center"
		>
			<Image
				src="/assets/empty-favorites-icon.webp"
				alt="Фото"
				width={200}
				height={200}
				priority
			/>

			<p className="text-lg font-semibold">{t("empty.p1")}</p>

			<p className="mb-2 text-muted">{t("empty.p2")}</p>

			<div className="flex w-full items-center justify-between px-1">
				<Button
					variant="outline"
					title={t("labels.toCatalog")}
					onClick={() => push(EnumAppRoute.CATALOG)}
				>
					{t("empty.toCatalog")}
				</Button>

				<Button
					variant="outline"
					title={t("labels.toHome")}
					onClick={() => push(EnumAppRoute.INDEX)}
				>
					{t("empty.toHome")}
				</Button>
			</div>
		</m.div>
	)
}

export { FavoritesEmpty }
