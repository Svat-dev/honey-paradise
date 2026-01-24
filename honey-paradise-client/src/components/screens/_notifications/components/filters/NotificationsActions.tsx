import { CheckSquareIcon, FolderDownIcon, Trash2Icon } from "lucide-react"
import type { FC } from "react"

import { Button, Separator } from "@/components/ui/common"

import { useNotificationsFiltersActions } from "../../hooks/useNotificationsFilters"
import styles from "../../styles/notifications-filters.module.scss"

interface IActionsProps {
	markAsReadAll: () => Promise<void>
	isAllMarkingAsRead: boolean
	unReadLength: number
}

const ActionsWrapper: FC<IActionsProps> = ({
	markAsReadAll,
	isAllMarkingAsRead,
	unReadLength
}) => {
	const {
		cancelSelectMode,
		archiveSelected,
		deleteSelected,
		readSelected,
		isSelectMode,
		selectedLength,
		refresh,
		t
	} = useNotificationsFiltersActions()

	return (
		<div className={styles["actions-wrapper"]}>
			{isSelectMode ? (
				<div>
					<p>{t("filters.actions.selectedTxt", { length: selectedLength })}</p>

					<Separator orientation="vertical" className="mx-3 !h-7 bg-muted" />

					<Button
						variant="ghost"
						title={t("labels.readSelectedBtn")}
						disabled={unReadLength === 0}
						onClick={readSelected}
					>
						<CheckSquareIcon size={20} />
					</Button>

					<Button
						variant="ghost"
						title={t("labels.archiveSelectedBtn")}
						onClick={archiveSelected}
					>
						<FolderDownIcon size={20} />
					</Button>

					<Button
						variant="ghost"
						title={t("labels.deleteSelectedBtn")}
						className="text-red-500"
						onClick={deleteSelected}
					>
						<Trash2Icon size={20} />
					</Button>

					<Separator orientation="vertical" className="mx-3 !h-7 bg-muted" />

					<Button
						variant="destructive"
						title={t("labels.cancelBtn")}
						onClick={cancelSelectMode}
					>
						{t("filters.actions.cancelBtn")}
					</Button>
				</div>
			) : (
				<>
					<Button
						variant="secondary"
						title={t("filters.actions.refresh")}
						onClick={refresh}
						disabled={isAllMarkingAsRead}
					>
						{t("filters.actions.refresh")}
					</Button>
					<Button
						variant="secondary"
						title={t("filters.actions.readAll")}
						onClick={markAsReadAll}
						disabled={isAllMarkingAsRead || unReadLength === 0}
						isLoading={isAllMarkingAsRead}
					>
						{t("filters.actions.readAll")}
					</Button>
				</>
			)}
		</div>
	)
}

export { ActionsWrapper }
