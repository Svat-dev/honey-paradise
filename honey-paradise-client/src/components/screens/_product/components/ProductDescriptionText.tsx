import { MessageCircleMoreIcon, StarIcon } from "lucide-react"
import { type HTMLMotionProps, m } from "motion/react"
import { useTranslations } from "next-intl"
import { type FC, memo } from "react"

import { Link } from "@/components/ui/common"
import { EnumAppRoute } from "@/shared/lib/constants/routes"
import { capitalize } from "@/shared/lib/utils/base"
import type { ApiJsonValue } from "@/shared/types/server"

interface IProps {
	category: { slug: string; title: ApiJsonValue }
	description: ApiJsonValue
	rating: number
	reviews: number
	locale: string
}

const ProductDescriptionText: FC<IProps> = memo(
	({ category, description, rating, reviews, locale }) => {
		const t = useTranslations("global.product.content")

		const getProps = (i: number): HTMLMotionProps<"p"> => ({
			initial: { opacity: 0, y: -10 },
			animate: { opacity: 1, y: 0 },
			transition: { duration: 0.4, type: "tween", delay: 0.3 * i },
			className: i === 2 || i === 3 ? "inline-flex items-center" : ""
		})

		return (
			<>
				<m.p {...getProps(0)}>
					<span className="text-muted">{t("description.category")}:</span>&nbsp;
					<Link
						href={EnumAppRoute.CATALOG + `/${category.slug}`}
						className="transition-all will-change-auto hover:text-muted hover:shadow-sm"
					>
						{capitalize(category.title[locale as keyof ApiJsonValue], true)}
					</Link>
				</m.p>

				<m.p {...getProps(1)}>
					<span className="text-muted">{t("description.text.name")}:</span>
					&nbsp;
					{description
						? description[locale as keyof ApiJsonValue]
						: t("description.text.noDesc")}
				</m.p>

				<m.p {...getProps(2)} suppressHydrationWarning>
					<span className="text-muted">{t("description.rating.name")}:</span>
					&nbsp;
					{t.rich("description.rating.value", { rating })}
					<StarIcon size={20} className="ml-1" />
				</m.p>

				<m.p {...getProps(3)}>
					<span className="text-muted">{t("description.comment")}:</span>&nbsp;
					<Link href="#product-reviews">
						{reviews}
						<MessageCircleMoreIcon size={20} className="ml-1" />
					</Link>
				</m.p>
			</>
		)
	}
)

export { ProductDescriptionText }
