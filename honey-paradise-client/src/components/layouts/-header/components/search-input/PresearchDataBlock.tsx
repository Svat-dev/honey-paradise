import { useQuery } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react"
import { AnimatePresence, m } from "motion/react"
import { useLocale } from "next-intl"
import type { FC } from "react"

import { productsService } from "@/services/products.service"
import { queryKeys } from "@/shared/lib/constants/routes"

import { PresearchCategory } from "./PresearchCategory"
import { PresearchHistory } from "./PresearchHistory"
import { PresearchProduct } from "./PresearchProduct"

interface IProps {
	term: string
}

const PresearchDataBlock: FC<IProps> = ({ term }) => {
	const locale = useLocale()

	const { data, isLoading, isPending } = useQuery({
		queryKey: [queryKeys.getProductsBySearch, term],
		queryFn: () => productsService.getPresearchData(term!),
		enabled: typeof term === "string"
	})

	const _isLoading = isLoading || isPending

	return (
		<m.div
			initial={{ opacity: 0.6, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
			transition={{ type: "tween" }}
			className="absolute top-12 z-40 grid h-[30rem] w-full grid-cols-2 grid-rows-[2fr_1fr] overflow-hidden rounded-md bg-black shadow-sm"
		>
			<PresearchHistory />

			<ul className="flex list-none flex-col gap-3 bg-background/90 pb-3 pl-3 pr-5">
				<PresearchCategory
					cats={data?.data.categories || null}
					isLoading={_isLoading}
					locale={locale}
				/>
			</ul>

			<div className="relative col-[2_/_3] row-[1_/_3] h-full overflow-y-scroll bg-background">
				<AnimatePresence>
					{_isLoading && (
						<m.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ type: "tween", duration: 0.2 }}
							className="pointer-events-none absolute right-1 top-1 flex animate-spin items-center justify-center"
						>
							<Loader2Icon size={24} />
						</m.div>
					)}
				</AnimatePresence>

				<PresearchProduct
					products={data?.data.products || null}
					isLoading={_isLoading}
					locale={locale}
				/>
			</div>
		</m.div>
	)
}

export { PresearchDataBlock }
