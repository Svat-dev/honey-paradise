import { type ICNProps } from "@/shared/types/base.type";
import { cn } from "@utils/base";
import { XIcon } from "lucide-react";
import { type FC } from "react";

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
				"absolute top-1/2 right-2.5 -translate-y-1/2 group transition-opacity duration-200",
				{
					"opacity-0 pointer-events-none invisible": !value,
				},
				className
			)}
			onClick={onClick}
		>
			<XIcon size={20} className="opacity-50 group-hover:opacity-100 transition-opacity" />
		</button>
	);
};

export { ClearButton };
