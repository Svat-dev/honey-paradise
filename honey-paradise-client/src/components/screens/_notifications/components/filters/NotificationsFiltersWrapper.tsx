import type { FC } from "react";
import { useNotificationsFiltersWrapper } from "../../hooks/useNotificationsFilters";
import styles from "../../styles/notifications-filters.module.scss";
import { ActionsWrapper } from "./NotificationsActions";
import { FiltersWrapper } from "./NotificationsFilters";

interface IProps {
	unReadLength: number;
	disabled: boolean;
}

const NotificationsFilters: FC<IProps> = ({ unReadLength, disabled }) => {
	const { isAllMarkingAsRead, markAsReadAll } = useNotificationsFiltersWrapper();

	return (
		<div className={styles["wrapper"]}>
			<FiltersWrapper isAllMarkingAsRead={isAllMarkingAsRead} disabled={disabled} />

			<ActionsWrapper
				isAllMarkingAsRead={isAllMarkingAsRead}
				markAsReadAll={markAsReadAll}
				unReadLength={unReadLength}
				disabled={disabled}
			/>
		</div>
	);
};

export { NotificationsFilters };
