import { AnimatePresence, m } from "motion/react"
import Image from "next/image"
import type { FC } from "react"

import { Link, Title } from "@/components/ui/common"
import { EnumAppRoute } from "@/shared/lib/constants/routes"
import { useMyAccount } from "@/shared/lib/hooks/auth"
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice"
import { getAssetsPath } from "@/shared/lib/utils"
import type {
	ApiJsonValue,
	ProductsPresearchResponse
} from "@/shared/types/server"

interface IPresearchProduct {
	products: ProductsPresearchResponse[] | null
	isLoading: boolean
	locale: string
}

const PresearchProduct: FC<IPresearchProduct> = ({
	isLoading,
	locale,
	products
}) => {
	const { user } = useMyAccount()

	const { getPrice } = useGetPrice(user?.settings.defaultCurrency)

	return (
		<AnimatePresence>
			<ul className="grid h-fit list-none grid-cols-2 grid-rows-subgrid items-center justify-items-center gap-4 px-2 py-3">
				{products?.length && !isLoading ? (
					products.map(({ id, images, slug, title, priceInUsd }) => (
						<m.li
							key={id}
							whileHover={{ y: -5, x: 5, boxShadow: "0 0 10px 2px #00000026" }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, y: 5 }}
							transition={{ type: "spring", bounce: 6, stiffness: 250 }}
							className="max-w-36"
						>
							<Link
								href={`${EnumAppRoute.PRODUCT}/${slug}`}
								className="flex flex-col items-center"
							>
								<div className="flex w-36 items-center justify-center">
									<Image
										src={getAssetsPath(images[0])}
										alt={`Product ${id}`}
										width={100}
										height={100}
										className="rounded-md"
									/>
								</div>

								<Title
									size="sm"
									className="whitespace-break-spaces text-balance text-center text-base"
								>
									{title[locale as keyof ApiJsonValue]}
								</Title>

								<div className="flex items-end gap-1">
									<p>{getPrice(priceInUsd, true, true)}</p>
									<p className="text-sm text-muted line-through">
										{getPrice(priceInUsd + (priceInUsd / 100) * 10, true, true)}
									</p>
								</div>
							</Link>
						</m.li>
					))
				) : (
					<p>Ничего не нашлось</p>
				)}
			</ul>
		</AnimatePresence>
	)
}

export { PresearchProduct }
