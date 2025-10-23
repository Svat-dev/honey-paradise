import { AnimatePresence, m } from "motion/react";
import type { ApiJsonValue, ProductsPresearchResponse } from "@/shared/types/server";
import { Link, Title } from "@/components/ui/common";

import { EnumAppRoute } from "@/shared/lib/constants/routes";
import type { FC } from "react";
import Image from "next/image";
import { getAssetsPath } from "@/shared/lib/utils";
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice";
import { useMyAccount } from "@/shared/lib/hooks/auth";

interface IPresearchProduct {
	products: ProductsPresearchResponse[] | null;
	isLoading: boolean;
	locale: string;
}

const PresearchProduct: FC<IPresearchProduct> = ({ isLoading, locale, products }) => {
	const { user } = useMyAccount();

	const { getPrice } = useGetPrice(user?.settings.defaultCurrency);

	return (
		<AnimatePresence>
			<ul className="grid grid-cols-2 items-center justify-items-center grid-rows-subgrid gap-4 px-2 py-3 list-none h-fit">
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
							<Link href={`${EnumAppRoute.PRODUCT}/${slug}`} className="flex flex-col items-center">
								<div className="flex items-center justify-center w-36">
									<Image src={getAssetsPath(images[0])} alt={`Product ${id}`} width={100} height={100} className="rounded-md" />
								</div>

								<Title size="sm" className="text-base whitespace-break-spaces text-center text-balance">
									{title[locale as keyof ApiJsonValue]}
								</Title>

								<div className="flex items-end gap-1">
									<p>{getPrice(priceInUsd, true, true)}</p>
									<p className="text-sm text-muted line-through">{getPrice(priceInUsd + (priceInUsd / 100) * 10, true, true)}</p>
								</div>
							</Link>
						</m.li>
					))
				) : (
					<p>Ничего не нашлось</p>
				)}
			</ul>
		</AnimatePresence>
	);
};

export { PresearchProduct };
