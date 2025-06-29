import Link from "next/dist/client/link";
import type { FC } from "react";
import styles from "../styles/list-item.module.scss";
import type { IAccountNavigation } from "../types/data.type";

const ListItem: FC<{ data: IAccountNavigation }> = ({ data }) => {
	const { route, title, isCurrent } = data;

	return (
		<li className={styles["wrapper"]} data-status={isCurrent}>
			<Link href={route} className={styles["link"]}>
				<data.icon />
				<p>{title}</p>
			</Link>
		</li>
	);
};

export { ListItem };
