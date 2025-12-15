import { Button, Input, Skeleton, Title } from "@/components/ui/common";

import { CartPrint } from "./CartPrint";
import type { FC } from "react";
import type { GetMyCartResponseCurrency } from "@/shared/types/server";
import { TableIcon } from "lucide-react";
import { useCreateOrderS } from "@/services/hooks/order/useCreateOrderS";
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice";
import { useTranslations } from "next-intl";

interface IProps {
	length?: number;
	total?: number;
	currency?: GetMyCartResponseCurrency;
	isLoading: boolean;
}

const CartFooter: FC<IProps> = ({ length, total, currency, isLoading }) => {
	const t = useTranslations("global.cart.content");
	const { getPrice } = useGetPrice(currency);
	const { createOrder, isCreatingOrder } = useCreateOrderS();

	return (
		<section className="grid grid-cols-[2fr_1fr] w-full bg-primary py-3 px-4 rounded-md">
			<div>
				<Title size="md" className="font-semibold text-2xl">
					{t("footer.title")}
				</Title>

				<div className="flex ml-1 text-lg">
					{t.rich("footer.amount", {
						isLoading: String(isLoading),
						length: length || 0,
						total: getPrice(total || 0, true, false),
						title: chunks => (
							<Title size="sm" className="text-xl">
								{chunks}
								&nbsp;
							</Title>
						),
						txt1: chunks => <span className="flex items-center font-semibold gap-1">{chunks}&nbsp;</span>,
						txt2: chunks => <span>{chunks}&nbsp;</span>,
						txt3: chunks => <span className="font-medium">{chunks}</span>,
						loader1: () => <Skeleton className="w-6 h-5" />,
						loader2: () => <Skeleton className="h-5 w-16" />,
					})}
				</div>

				<div className="flex ml-1 text-lg">
					{t.rich("footer.discount", {
						title: chunks => (
							<Title size="sm" className="text-xl">
								{chunks}
								&nbsp;
							</Title>
						),
						txt: () => <span className="font-medium">???%</span>,
					})}
				</div>
			</div>

			<div>
				<div className="flex flex-col mb-2">
					<Title size="sm" className="text-xl">
						{t("footer.promo.label")}
					</Title>

					<Input name="promo-code" placeholder={t("footer.promo.placeholder")} className="w-full mb-2" maxLength={30} />

					<Button variant="secondary" title={t("labels.usePromo")} className="px-2 py-1.5 self-end" disabled={isLoading}>
						{t("actions.usePromo")}
					</Button>
				</div>

				<div className="flex items-center justify-between mb-3">
					<CartPrint />

					<Button variant="link" title={t("footer.saveAsTable")} className="flex items-center gap-1 will-change-auto">
						<TableIcon size={20} />
						{t("footer.saveAsTable")}
					</Button>
				</div>

				<Button
					variant="secondary"
					className="w-full py-2 text-base"
					title={t("actions.confirmOrder")}
					disabled={(length ? length < 1 : true) || isCreatingOrder}
					isLoading={isCreatingOrder}
					onClick={() => createOrder()}
				>
					{t("actions.confirmOrder")}
				</Button>
			</div>
		</section>
	);
};

export { CartFooter };
