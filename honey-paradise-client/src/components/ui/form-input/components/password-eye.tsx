import { EyeIcon, EyeOffIcon } from "lucide-react";

import type { FC } from "react";
import styles from "../styles/form-input.module.scss";

interface IProps {
	value: boolean;
	onClick: VoidFunction;
	t: any;
}

const PasswordEye: FC<IProps> = ({ onClick, value, t }) => {
	const title = value ? t("hidePassword") : t("showPassword");

	return (
		<button type="button" title={title} onClick={onClick} className={styles["password-eye"]}>
			{value ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
		</button>
	);
};

export { PasswordEye };
