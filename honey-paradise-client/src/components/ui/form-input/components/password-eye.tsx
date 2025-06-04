import { EyeIcon, EyeOffIcon } from "lucide-react";

import type { FC } from "react";
import styles from "../form-input.module.scss";

interface IProps {
	value: boolean;
	onClick: VoidFunction;
}

const PasswordEye: FC<IProps> = ({ onClick, value }) => {
	const title = value ? "Показать" : "Скрыть";

	return (
		<button type="button" title={title} onClick={onClick} className={styles["password-eye"]}>
			{value ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
		</button>
	);
};

export { PasswordEye };
