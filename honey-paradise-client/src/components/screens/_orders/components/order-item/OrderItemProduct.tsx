import { m } from "motion/react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import * as path from "path"
import type { FC } from "react"

import { Title } from "@/components/ui/common"
import { EnumAppRoute } from "@/shared/lib/constants/routes"
import { getAssetsPath } from "@/shared/lib/utils"
import type { GetExtraOrderInfoItem } from "@/shared/types/server"

interface IOrderItemProduct extends Omit<GetExtraOrderInfoItem, "price"> {
	price: string
}

const OrderItemProduct: FC<IOrderItemProduct> = ({
	art,
	price,
	quantity,
	weight,
	product: { images, slug, title }
}) => {
	const t = useTranslations("global.orders.content")

	const imageUrl = getAssetsPath(images[0])
	const link = path.join(EnumAppRoute.PRODUCT, `${slug}-${art}`)

	return (
		<m.div
			initial={{ opacity: 0, y: -40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			whileHover={{ margin: "0 2.5rem" }}
		>
			<Link
				href={link}
				className="grid grid-cols-[auto_1fr_min-content] items-center gap-5"
			>
				<Image
					src={imageUrl}
					alt=""
					width={120}
					height={90}
					className="h-[90px] w-32 rounded-md border border-muted bg-white"
					loading="lazy"
					loader={() => "/assets/some-image-icon.webp"}
				/>

				<div>
					<Title size="sm">{title["ru"]}</Title>
					<span className="text-muted">{t("item.weight", { weight })}</span>
				</div>

				<div className="text-nowrap text-end">
					<p className="font-medium">{price}</p>
					<span className="text-muted">{t("item.quantity", { quantity })}</span>
				</div>
			</Link>
		</m.div>
	)
}

export { OrderItemProduct }
