import { useTranslations } from "next-intl"
import Image from "next/image"

const OrdersEmpty = () => {
	const t = useTranslations("global.transactions.content")

	return (
		<div className="mt-6 flex w-fit animate-show-effect items-center gap-5 self-center rounded-md opacity-0">
			<Image
				src="/assets/not-found-notifications.webp"
				alt={t("labels.notFoundImage")}
				width={250}
				height={155}
				loading="lazy"
			/>
			<p className="leading-7">{t.rich("empty", { br: () => <br /> })}</p>
		</div>
	)
}

export { OrdersEmpty }
