import { DropdownMenuItem } from "@/components/ui";
import { cn } from "@/shared/lib/utils/base";
import { CircleHelpIcon } from "lucide-react";
import { type FC } from "react";
import { useShowDescription } from "../../hooks/useShowDescription";
import styles from "../../styles/logout-button.module.scss";

interface ILogoutMenuDMI {
	title: string;
	description: string;
	descClassName?: string;
	onClick?: VoidFunction;
}

const LogoutButtonDMI: FC<ILogoutMenuDMI> = ({ description, title, descClassName, onClick }) => {
	const { handleMouseEnter, handleMouseLeave, isShowed } = useShowDescription();

	return (
		<DropdownMenuItem className={styles["logout-btn-dmi"]} onClick={onClick}>
			<p>{title}</p>
			<CircleHelpIcon onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />

			<div
				className={cn(descClassName, {
					"!tw-opacity-100": isShowed,
				})}
			>
				{description}
			</div>
		</DropdownMenuItem>
	);
};

export { LogoutButtonDMI };
