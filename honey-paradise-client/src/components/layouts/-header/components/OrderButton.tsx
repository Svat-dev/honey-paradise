"use client";

import { convertPrice, getCurrencyFromSettings } from "@/shared/lib/utils";
import { MoveRightIcon, ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/common";
import { currenciesFetchStore } from "@/shared/store/currencies-fetch.store";
import { EnumAppRoute } from "@constants/routes";
import { useMyAccount } from "@hooks/auth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import styles from "../styles/order-button.module.scss";

const OrderButton = () => {
	const t = useTranslations("layout.header.labels");
	const { push } = useRouter();

	const { user } = useMyAccount();
	const rates = currenciesFetchStore(state => state.rates);

	const onClick = () => push(EnumAppRoute.MY_CART);

	const totalPriceUsd = 100;
	const totalCount = 6;

	const currency = user?.settings.defaultCurrency ? getCurrencyFromSettings(user?.settings.defaultCurrency) : "USD";
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
