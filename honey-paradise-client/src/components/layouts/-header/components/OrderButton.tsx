"use client";

import { MoveRightIcon, ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/common";
import { EnumAppRoute } from "@constants/routes";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import styles from "../styles/order-button.module.scss";

const OrderButton = () => {
	const t = useTranslations("layout.header.labels");
	const { push } = useRouter();

	const onClick = () => push(EnumAppRoute.MY_CART);

	const totalPrice = 1000;
	const totalCount = 6;

	return (
		<Button variant="secondary" title={t("watchCart")} onClick={onClick} className={styles["order-button"]}>
			<ShoppingCartIcon />
			<MoveRightIcon width={40} />

			<p>{totalPrice}₽</p>
			<p className={styles["total-count"]}>{totalCount} шт.</p>
		</Button>
	);
};

export { OrderButton };
