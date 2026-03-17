import { useTranslations } from "next-intl"
import Image from "next/image"

import styles from "../styles/notifications.module.scss"

const NotificationEmpty = () => {
	const t = useTranslations("global.notifications.content")

	return (
		<div className={styles["not-found"]}>
			<Image
				src="/assets/not-found-notifications.webp"
				alt={t("labels.notFoundImage")}
				width={250}
				height={155}
				loading="lazy"
			/>
			<p>{t.rich("notFound", { br: () => <br /> })}</p>
		</div>
	)
}

export { NotificationEmpty }
