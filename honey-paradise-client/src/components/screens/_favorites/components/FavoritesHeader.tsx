import type { FC } from "react"

import { Button, Skeleton, Title } from "@/components/ui/common"

import { useFavoritesHeader } from "../hooks/useFavoritesHeader"

interface IFavoritesHeaderProps {
	length: number | undefined
	total: string | undefined
	isLoading: boolean
}

const FavoritesHeader: FC<IFavoritesHeaderProps> = ({
	length,
	total,
	isLoading
}) => {
	const {
		isAddingFavoritesToCart,
		isClearingFavoritesProducts,
		handleAddFavoritesToCart,
		handleClearFavorites,
		t
	} = useFavoritesHeader()

	return (
		<section className="sticky top-16 z-20 mb-5 flex w-full justify-between rounded-md bg-primary p-3">
			<Title size="md" className="flex items-center self-start text-xl">
				{t.rich("amount", {
					isLoading: String(isLoading),
					length: length || 0,
					total: total || 0,
					txt1: chunks => (
						<span className="flex items-center gap-1 font-semibold">
							{chunks}
						</span>
					),
					txt2: chunks => <span>{chunks}</span>,
					txt3: chunks => <span className="font-medium">{chunks}</span>,
					loader1: () => <Skeleton className="h-5 w-6" />,
					loader2: () => <Skeleton className="h-5 w-16" />,
					space: () => <>&nbsp;</>
				})}
			</Title>

			<div className="flex flex-col gap-2">
				<Button
					variant="secondary"
					className="px-2 py-1.5"
					title={t("labels.addToCart")}
					disabled={isLoading || length === 0 || isAddingFavoritesToCart}
					isLoading={isAddingFavoritesToCart}
					onClick={handleAddFavoritesToCart}
				>
					{t("actions.allToCart")}
				</Button>

				<Button
					variant="destructive"
					className="px-2 py-1.5"
					title={t("labels.clear")}
					disabled={isLoading || length === 0 || isClearingFavoritesProducts}
					isLoading={isClearingFavoritesProducts}
					onClick={handleClearFavorites}
				>
					{t("actions.clear")}
				</Button>
			</div>
		</section>
	)
}

export { FavoritesHeader }
