import { m } from "motion/react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/common"
import { EnumAppRoute } from "@/shared/lib/constants/routes"

const CartEmpty = () => {
	const t = useTranslations("global.cart.content.empty")
	const { push } = useRouter()

	return (
		<m.div
			initial={{ opacity: 0, scale: 0.95, translateY: "-50%" }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4, delay: 0.3 }}
			className="absolute top-1/2 flex -translate-y-1/2 flex-col items-center self-center"
		>
			<Image
				src="/assets/empty-cart-icon.webp"
				alt="Фото"
				width={200}
				height={200}
				priority
			/>

			<p className="text-lg font-semibold">{t("title")}</p>

			<p className="mb-2 text-center text-muted">
				{t.rich("text", { br: () => <br /> })}
			</p>

			<div className="flex w-full items-center justify-between px-1">
				<Button
					variant="outline"
					title={t("toCatalog")}
					onClick={() => push(EnumAppRoute.CATALOG)}
				>
					{t("toCatalog")}
				</Button>

				<Button
					variant="outline"
					title={t("toFavorites")}
					onClick={() => push(EnumAppRoute.FAVORITES)}
				>
					{t("toFavorites")}
				</Button>
			</div>
		</m.div>
	)
}

export { CartEmpty }
