import { Button, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/common";
import { CheckIcon, FilterIcon, RotateCwIcon } from "lucide-react";

import { getNotificationHeadingByType } from "@utils/get-notification-heading-by-type";
import type { FC } from "react";
import { useNotificationsFilters } from "../hooks/useNotificationsFilters";
import styles from "../styles/notifications-filters.module.scss";

interface IProps {
	unReadLength: number;
}

const NotificationsFilters: FC<IProps> = ({ unReadLength }) => {
	const {
		notificationsFilters: { sortType, notificationType },
		queryParams: { is_read, types, sort },
		onChangeNotificationsType,
		onChangeSortType,
		onChangeIsRead,
		isAllMarkingAsRead,
		markAsReadAll,
		SortIcon,
		reset,
	} = useNotificationsFilters();

	return (
		<div className={styles["wrapper"]}>
			<div className={styles["filters-wrapper"]}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" className={styles["dm-trigger"]} disabled={isAllMarkingAsRead}>
							<FilterIcon size={16} />
							{"Тип уведомлений"}
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
								{getNotificationHeadingByType(item.type)}
							</Checkbox>
						))}
					</DropdownMenuContent>
				</DropdownMenu>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" className={styles["dm-trigger"]} disabled={isAllMarkingAsRead}>
							<SortIcon className="tw-opacity-0 tw-animate-show-effect" />
							{"Сортировка"}
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
					Только непрочитанные
				</Checkbox>

				<Button variant="ghost" title={"Сбросить фильтры"} className={styles["reset"]} onClick={reset} disabled={isAllMarkingAsRead}>
					<RotateCwIcon size={20} />
				</Button>
			</div>

			<div className={styles["actions-wrapper"]}>
				<Button
					variant="secondary"
					onClick={markAsReadAll}
					disabled={isAllMarkingAsRead || unReadLength === 0}
					isLoading={isAllMarkingAsRead}
				>
					{"Прочитать все"}
				</Button>
			</div>
		</div>
	);
};

export { NotificationsFilters };
