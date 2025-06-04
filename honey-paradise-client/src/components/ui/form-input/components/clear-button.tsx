import type { ICNProps } from "@/shared/types/base.type";
import { cn } from "@utils/base";
import { XIcon } from "lucide-react";
import type { FC } from "react";
import styles from "../form-input.module.scss";

interface IProps extends ICNProps {
	value: string | undefined;
	onClick: VoidFunction;
}

const ClearButton: FC<IProps> = ({ value, onClick, className }) => {
	return (
		<button
			type="button"
			title="Очистить"
			className={cn(
				styles["clear-btn"],
				{
					"tw-opacity-0 tw-pointer-events-none tw-invisible": !value,
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
