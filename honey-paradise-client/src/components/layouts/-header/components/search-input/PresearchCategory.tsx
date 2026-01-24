import { AnimatePresence, m } from "motion/react"
import Image from "next/image"
import type { FC } from "react"

import { Link } from "@/components/ui/common"
import { EnumAppRoute } from "@/shared/lib/constants/routes"
import { getAssetsPath } from "@/shared/lib/utils"
import type {
	ApiJsonValue,
	CategoriesPresearchResponse
} from "@/shared/types/server"

interface IPresearchCategory {
	cats: CategoriesPresearchResponse[] | null
	isLoading: boolean
	locale: string
}

const PresearchCategory: FC<IPresearchCategory> = ({
	cats,
	isLoading,
	locale
}) => {
	return (
		<AnimatePresence>
			{cats?.length && !isLoading ? (
				cats.map(({ id, image, slug, title }) => (
					<m.li
						key={id}
						whileHover={{ y: -5, x: 5, boxShadow: "0 0 10px 2px #00000026" }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, y: 5 }}
					>
						<Link
							href={`${EnumAppRoute.CATALOG}/${slug}`}
							className="flex items-center gap-2"
						>
							<Image
								src={getAssetsPath(image)}
								alt={`Category ${slug}`}
								width={45}
								height={40}
								className="rounded-md"
							/>
							{title[locale as keyof ApiJsonValue]}
						</Link>
					</m.li>
				))
			) : (
				<p>Ничего не нашлось</p>
			)}
		</AnimatePresence>
	)
}

export { PresearchCategory }
