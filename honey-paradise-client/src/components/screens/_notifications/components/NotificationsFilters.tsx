import { Button, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/common";
import { CheckIcon, FilterIcon, RotateCwIcon } from "lucide-react";

import { getNotificationHeadingByType } from "@utils/get-notification-heading-by-type";
import { useNotificationsFilters } from "../hooks/useNotificationsFilters";
import styles from "../styles/notifications-filters.module.scss";

const NotificationsFilters = () => {
	const {
		notificationsFilters: { sortType, notificationType },
		queryParams: { is_read, types, sort },
		onChangeNotificationsType,
		onChangeSortType,
		onChangeIsRead,
		SortIcon,
		reset,
	} = useNotificationsFilters();

	return (
		<div className={styles["wrapper"]}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary" className={styles["dm-trigger"]}>
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
					<Button variant="secondary" className={styles["dm-trigger"]}>
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

			<Checkbox className={styles["checkbox"]} checked={is_read === "true"} onChange={e => onChangeIsRead(e.currentTarget.checked)}>
				Только непрочитанные
			</Checkbox>

			<Button variant="ghost" title={"Сбросить фильтры"} className={styles["reset"]} onClick={reset}>
				<RotateCwIcon size={20} />
			</Button>
		</div>
	);
};

export { NotificationsFilters };
