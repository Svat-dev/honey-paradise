import { EyeIcon, EyeOffIcon } from "lucide-react";

import type { FC } from "react";
import type { ICNProps } from "@/shared/types";
import { cn } from "@utils/base";
import styles from "../styles/default-input.module.scss";

interface IProps extends ICNProps {
	value: boolean;
	onClick: VoidFunction;
	t: any;
}

const PasswordEye: FC<IProps> = ({ onClick, value, t, className }) => {
	const title = value ? t("labels.hidePassword") : t("labels.showPassword");

	return (
		<button type="button" title={title} onClick={onClick} className={cn(className, styles["password-eye"])}>
			{value ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
		</button>
	);
};

export { PasswordEye };
