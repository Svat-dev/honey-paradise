import { EyeIcon, EyeOffIcon } from "lucide-react";

import { type FC } from "react";

interface IProps {
	value: boolean;
	onClick: VoidFunction;
}

const PasswordEye: FC<IProps> = ({ onClick, value }) => {
	const title = value ? "Показать" : "Скрыть";

	return (
		<button type="button" title={title} className="absolute top-1/2 left-3 -translate-y-1/2 group transition-opacity duration-200">
			{value ? (
				<EyeIcon size={20} className="opacity-50 group-hover:opacity-100 transition-opacity" onClick={onClick} />
			) : (
				<EyeOffIcon size={20} className="opacity-50 group-hover:opacity-100 transition-opacity" onClick={onClick} />
			)}
		</button>
	);
};

export { PasswordEye };
