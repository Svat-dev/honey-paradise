"use client";

import { MoveRightIcon, ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/common";
import styles from "../styles/order-button.module.scss";
import { useTranslations } from "next-intl";

const OrderButton = () => {
	const t = useTranslations("layout.header.labels");

	const totalPrice = 1000;
	const totalCount = 6;

	return (
		<Button variant="secondary" title={t("watchCart")} className={styles["order-button"]}>
			<ShoppingCartIcon />
			<MoveRightIcon width={40} />

			<p>{totalPrice}₽</p>
			<p className={styles["total-count"]}>{totalCount} шт.</p>
		</Button>
	);
};

export { OrderButton };
