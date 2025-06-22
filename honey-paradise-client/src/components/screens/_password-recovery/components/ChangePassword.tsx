"use client";

import { Button, Title } from "@/components/ui";

import { FormInput } from "@/components/ui/form-input";
import { VALUES } from "@constants/base";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import { cn } from "@utils/base";
import Image from "next/image";
import { FC } from "react";
import { FormProvider } from "react-hook-form";
import { useChangePassword } from "../hooks/useChangePassword";
import styles from "../styles/change-password.module.scss";

interface IChangePassword {
	token: string;
}

const ChangePassword: FC<IChangePassword> = ({ token }) => {
	const { changePasswordForm, dataStatus, onSubmit, isPasswordUpdating } = useChangePassword(token);

	return (
		<section data-status={dataStatus} className={cn(_styles["wrapper"], styles["wrapper"])}>
			<span data-status={dataStatus} className={cn(_styles["border-line"], styles["border-line"])} />

			<FormProvider {...changePasswordForm}>
				<form className={_styles["form"]} onSubmit={onSubmit}>
					<div className={styles["title-wrapper"]}>
						<div>
							<Title size="lg">{"Придумайте новый пароль"}</Title>
							<p>{"Введите новый пароль, который Вы будете использовать для входа в аккаунт"}</p>
						</div>

						<Image src="/assets/reset-password.webp" alt={"Иконка сброса пароля"} width={64} height={64} priority />
					</div>

					<FormInput
						name="password"
						type="password"
						placeholder={"Новый пароль"}
						containerClassName={styles["input-wrapper"]}
						maxLength={VALUES.MAX_PASSWORD_LENGTH}
						required
					/>

					<div className={styles["actions-wrapper"]}>
						<Button variant="secondary" title={"Подтвердить изменённый пароль"} type="submit" isLoading={isPasswordUpdating}>
							{"Подтвердить изменения"}
						</Button>
					</div>
				</form>
			</FormProvider>
		</section>
	);
};

export { ChangePassword };
