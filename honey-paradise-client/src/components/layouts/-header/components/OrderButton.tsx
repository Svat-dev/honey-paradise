"use client";

import { MoveRightIcon, ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/common";
import { useGetMyCartS } from "@/services/hooks/cart/useGetMyCartS";
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice";
import { EnumAppRoute } from "@constants/routes";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import styles from "../styles/order-button.module.scss";

const OrderButton = () => {
	const t = useTranslations("layout.header.labels");
	const { push } = useRouter();

	const { cart, isCartLoading } = useGetMyCartS();

	const onClick = () => push(EnumAppRoute.MY_CART);

	const totalPriceUsd = cart?.totalPrice || 0;
	const totalCount = cart?.length || 0;

	const { getPrice } = useGetPrice(cart?.currency);

	return (
		<Button variant="secondary" title={t("watchCart")} onClick={onClick} className={styles["order-button"]}>
			<ShoppingCartIcon />
			<MoveRightIcon width={40} />

			<p>{getPrice(totalPriceUsd, true, true)}</p>
			<p className={styles["total-count"]}>{totalCount} шт.</p>
		</Button>
	);
};

export { OrderButton };
