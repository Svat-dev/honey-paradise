import { Skeleton } from "@/components/ui/common";
import type { FC } from "react";
import styles from "../../../styles/devices.module.scss";

interface IProps {
	amount: number;
}

const SessionsLoading: FC<IProps> = ({ amount }) => {
	return (
		<>
			{...Array(amount)
				.fill(0)
				.map((_, i) => <Skeleton key={i} className={styles["loading-item"]} />)}
		</>
	);
};

export { SessionsLoading };
