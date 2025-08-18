import { Button, Separator } from "@/components/ui/common";
import { CheckSquareIcon, FolderDownIcon, Trash2Icon } from "lucide-react";

import type { FC } from "react";
import { useNotificationsFiltersActions } from "../../hooks/useNotificationsFilters";
import styles from "../../styles/notifications-filters.module.scss";

interface IActionsProps {
	markAsReadAll: () => Promise<void>;
	isAllMarkingAsRead: boolean;
	unReadLength: number;
	disabled: boolean;
}

const ActionsWrapper: FC<IActionsProps> = ({ markAsReadAll, isAllMarkingAsRead, unReadLength, disabled }) => {
	const { cancelSelectMode, archiveSelected, deleteSelected, readSelected, isSelectMode, selectedLength, t } =
		useNotificationsFiltersActions();

	return (
		<div className={styles["actions-wrapper"]}>
			{isSelectMode ? (
				<div>
					<p>{t("filters.actions.selectedTxt", { length: selectedLength })}</p>

					<Separator orientation="vertical" className="!tw-h-7 tw-bg-muted tw-mx-3" />

					<Button variant="ghost" title={t("labels.readSelectedBtn")} disabled={unReadLength === 0 || disabled} onClick={readSelected}>
						<CheckSquareIcon size={20} />
					</Button>
					<Button variant="ghost" title={t("labels.archiveSelectedBtn")} disabled={disabled} onClick={archiveSelected}>
						<FolderDownIcon size={20} />
					</Button>
					<Button
						variant="ghost"
						title={t("labels.deleteSelectedBtn")}
						className="tw-text-red-500"
						disabled={disabled}
						onClick={deleteSelected}
					>
						<Trash2Icon size={20} />
					</Button>

					<Separator orientation="vertical" className="!tw-h-7 tw-bg-muted tw-mx-3" />

					<Button variant="destructive" title={t("labels.cancelBtn")} onClick={cancelSelectMode}>
						{t("filters.actions.cancelBtn")}
					</Button>
				</div>
			) : (
				<>
					<Button
						variant="secondary"
						title={t("filters.actions.readAll")}
						onClick={markAsReadAll}
						disabled={isAllMarkingAsRead || disabled || unReadLength === 0}
						isLoading={isAllMarkingAsRead}
					>
						{t("filters.actions.readAll")}
					</Button>
				</>
			)}
		</div>
	);
};

export { ActionsWrapper };
