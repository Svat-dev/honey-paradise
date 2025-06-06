import { Button } from "@/components/ui";
import { FormInput } from "@/components/ui/form-input";
import { FormBlock } from "@/components/ui/layouts";
import { EnumAppRoute } from "@constants/routes";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import Link from "next/link";
import type { FC } from "react";
import styles from "../styles/main-part.module.scss";

interface IProps {
	onClickToNext: VoidFunction;
	isActive: boolean;
}

const MainPart: FC<IProps> = ({ onClickToNext, isActive }) => {
	return (
		<FormBlock title={"Создание аккаунта"} containerClassName={styles["section"]} titleClassName={_styles["title"]} active={isActive}>
			<FormInput name="email" type="email" label="Свой Email" containerClassName="tw-mb-12" required />

			<FormInput name="password" type="password" label="Придумайте пароль" containerClassName="tw-mb-12" required />

			<FormInput name="confirmPassword" type="password" label="Повторите пароль" containerClassName="tw-mb-12" required />

			<div className={styles["footer"]}>
				<Button variant="secondary" onClick={onClickToNext}>
					Продолжить 1/2
				</Button>

				<Link href={EnumAppRoute.SIGN_IN}>Есть профиль? Войдите</Link>
			</div>
		</FormBlock>
	);
};

export { MainPart };
