import type { ICNProps } from "@/shared/types/base.type";
import { cn } from "@utils/base";
import { XIcon } from "lucide-react";
import type { FC } from "react";
import styles from "../styles/default-input.module.scss";

interface IProps extends ICNProps {
	value: string | undefined;
	onClick: VoidFunction;
	t: any;
}

const ClearButton: FC<IProps> = ({ value, onClick, className, t }) => {
	return (
		<button
			type="button"
			title={t("clearBtn")}
			className={cn(
				styles["clear-btn"],
				{
					"!tw-opacity-0 !tw-scale-95 !tw-pointer-events-none": !value,
				},
				className
			)}
			onClick={onClick}
		>
			<XIcon size={20} />
		</button>
	);
};

export { ClearButton };
