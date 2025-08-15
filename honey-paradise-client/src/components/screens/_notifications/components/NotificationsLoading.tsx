import { Skeleton } from "@/components/ui/common";
import type { FC } from "react";
import styles from "../styles/notifications.module.scss";

interface IProps {
	limit: number;
}

const NotificationsLoading: FC<IProps> = ({ limit }) => {
	return (
		<>
			{...Array(limit)
				.fill(0)
				.map((_, i) => <Skeleton key={i} className={styles["loader"]} />)}
		</>
	);
};

export { NotificationsLoading };
