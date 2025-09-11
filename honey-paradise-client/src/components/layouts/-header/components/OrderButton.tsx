"use client";

import { convertPrice, getCurrencyFromSettings } from "@/shared/lib/utils";
import { MoveRightIcon, ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/common";
import { useGetMyCartS } from "@/services/hooks/cart/useGetMyCartS";
import type { TCurrenciesCodes } from "@/services/types/currency-service.type";
import { currenciesFetchStore } from "@/shared/store/currencies-fetch.store";
import { EnumAppRoute } from "@constants/routes";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import styles from "../styles/order-button.module.scss";

const OrderButton = () => {
	const t = useTranslations("layout.header.labels");
	const { push } = useRouter();

	const { cart, isCartLoading } = useGetMyCartS();
	const rates = currenciesFetchStore(state => state.rates);

	const onClick = () => push(EnumAppRoute.MY_CART);

	const totalPriceUsd = cart?.totalPrice || 0;
	const totalCount = cart?.length || 0;

	const currency: TCurrenciesCodes = cart?.currency ? getCurrencyFromSettings(cart.currency) : "USD";
	const totalPrice = currency === "USD" ? totalPriceUsd : totalPriceUsd * (rates?.[currency] || 1);

	return (
		<Button variant="secondary" title={t("watchCart")} onClick={onClick} className={styles["order-button"]}>
			<ShoppingCartIcon />
			<MoveRightIcon width={40} />

			<p>{convertPrice(totalPrice, currency, true)}</p>
			<p className={styles["total-count"]}>{totalCount} шт.</p>
		</Button>
	);
};

export { OrderButton };
