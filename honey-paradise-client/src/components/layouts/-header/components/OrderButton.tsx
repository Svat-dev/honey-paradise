import { MoveRightIcon, ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui";
import styles from "../styles/order-button.module.scss";

const OrderButton = () => {
	const totalPrice = 1000;
	const totalCount = 6;

	return (
		<Button variant="secondary" title="Посмотреть корзину" className={styles["order-button"]}>
			<ShoppingCartIcon />
			<MoveRightIcon width={40} />

			<p>{totalPrice}₽</p>
			<p className={styles["total-count"]}>{totalCount} шт.</p>
		</Button>
	);
};

export { OrderButton };
