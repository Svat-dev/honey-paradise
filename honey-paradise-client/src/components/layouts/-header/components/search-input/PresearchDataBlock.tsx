import { AnimatePresence, m } from "motion/react";

import { productsService } from "@/services/products.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useLanguage } from "@/shared/lib/i18n/hooks";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import type { FC } from "react";
import { PresearchCategory } from "./PresearchCategory";
import { PresearchHistory } from "./PresearchHistory";
import { PresearchProduct } from "./PresearchProduct";

interface IProps {
	term: string;
}

const PresearchDataBlock: FC<IProps> = ({ term }) => {
	const { locale } = useLanguage();

	const { data, isLoading, isPending } = useQuery({
		queryKey: [queryKeys.getProductsBySearch, term],
		queryFn: () => productsService.getPresearchData(term!),
		enabled: typeof term === "string",
	});

	const _isLoading = isLoading || isPending;

	return (
		<m.div
			initial={{ opacity: 0.6, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
			transition={{ type: "tween" }}
			className="absolute z-40 top-12 w-full rounded-md overflow-hidden h-[30rem] shadow-sm grid grid-cols-2 grid-rows-[2fr_1fr] bg-black"
		>
			<PresearchHistory />

			<ul className="flex flex-col gap-3 pl-3 pr-5 pb-3 bg-background/90 list-none">
				<PresearchCategory cats={data?.data.categories || null} isLoading={_isLoading} locale={locale} />
			</ul>

			<div className="relative bg-background row-[1_/_3] col-[2_/_3] overflow-y-scroll h-full">
				<AnimatePresence>
					{_isLoading && (
						<m.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ type: "tween", duration: 0.2 }}
							className="absolute right-1 top-1 flex items-center justify-center pointer-events-none animate-spin"
						>
							<Loader2Icon size={24} />
						</m.div>
					)}
				</AnimatePresence>

				<PresearchProduct products={data?.data.products || null} isLoading={_isLoading} locale={locale} />
			</div>
		</m.div>
	);
};

export { PresearchDataBlock };
