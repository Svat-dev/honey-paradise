import type { FC } from "react"

import { useNotificationsFiltersWrapper } from "../../hooks/useNotificationsFilters"
import styles from "../../styles/notifications-filters.module.scss"

import { ActionsWrapper } from "./NotificationsActions"
import { FiltersWrapper } from "./NotificationsFilters"

interface IProps {
	unReadLength: number
}

const NotificationsFilters: FC<IProps> = ({ unReadLength }) => {
	const { isAllMarkingAsRead, markAsReadAll } = useNotificationsFiltersWrapper()

	return (
		<div className={styles["wrapper"]}>
			<FiltersWrapper isAllMarkingAsRead={isAllMarkingAsRead} />

			<ActionsWrapper
				isAllMarkingAsRead={isAllMarkingAsRead}
				markAsReadAll={markAsReadAll}
				unReadLength={unReadLength}
			/>
		</div>
	)
}

export { NotificationsFilters }
