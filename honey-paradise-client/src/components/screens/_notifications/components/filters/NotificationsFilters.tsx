import { Button, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/common";
import { CheckIcon, FilterIcon, RotateCwIcon } from "lucide-react";

import type { FC } from "react";
import { useNotificationsFilters } from "../../hooks/useNotificationsFilters";
import styles from "../../styles/notifications-filters.module.scss";

interface IFiltersWrapperProps {
	isAllMarkingAsRead: boolean;
}

const FiltersWrapper: FC<IFiltersWrapperProps> = ({ isAllMarkingAsRead }) => {
	const {
		notificationsFilters: { notificationType, sortType },
		queryParams: { is_read, sort, types },
		SortIcon,
		onChangeIsRead,
		onChangeNotificationsType,
		onChangeSortType,
		reset,
		heading,
		t,
	} = useNotificationsFilters();

	return (
		<div className={styles["filters-wrapper"]}>
			<DropdownMenu>
				<DropdownMenuTrigger disabled={isAllMarkingAsRead} asChild>
					<Button variant="secondary" title={t("labels.notificationsTypeBtn")} className={styles["dm-trigger"]}>
						<FilterIcon size={16} />
						{t("filters.notificationsTypeBtn", { length: types?.length || 0 })}
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent role="list" className={styles["dm-content"]}>
					{notificationType.map(item => (
						<Checkbox
							key={item.type}
							checked={types?.includes(item.type)}
							onChange={e => onChangeNotificationsType(e.currentTarget.checked, item.type)}
							className={styles["checkbox"]}
							containerClassName={styles["dm-checkbox-item"]}
						>
							{heading(item.type)}
						</Checkbox>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<DropdownMenu>
				<DropdownMenuTrigger disabled={isAllMarkingAsRead} asChild>
					<Button variant="secondary" title={t("labels.sortTypeBtn")} className={styles["dm-trigger"]}>
						<SortIcon className="tw-opacity-0 tw-animate-show-effect" />
						{t("filters.sortTypeBtn")}
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent role="list" className={styles["dm-content"]}>
					{sortType.map(item => (
						<DropdownMenuItem key={item.type} className={styles["dm-item"]} onClick={() => onChangeSortType(item.type)}>
							<div>
								<item.icon size={20} />
								{item.label}
							</div>
							{sort === item.type && <CheckIcon size={24} />}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<Checkbox
				className={styles["checkbox"]}
				checked={is_read === "true"}
				onChange={e => onChangeIsRead(e.currentTarget.checked)}
				disabled={isAllMarkingAsRead}
			>
				{t("filters.onlyNotRead")}
			</Checkbox>

			<Button
				variant="ghost"
				title={t("labels.refreshAndResetBtn")}
				className={styles["reset"]}
				onClick={reset}
				disabled={isAllMarkingAsRead}
			>
				<RotateCwIcon size={20} />
			</Button>
		</div>
	);
};

export { FiltersWrapper };
