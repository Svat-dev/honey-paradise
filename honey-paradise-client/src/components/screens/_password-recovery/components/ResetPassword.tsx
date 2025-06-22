"use client";

import { Button, Title } from "@/components/ui";

import { FormInput } from "@/components/ui/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TPasswordResetFields, createPasswordResetSchema } from "@schemas/password-recovery.schema";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import { cn } from "@utils/base";
import Image from "next/image";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styles from "../styles/reset-password.module.scss";
import type { TDataStatus } from "../types/type";

const ResetPassword = () => {
	const [dataStatus, setDataStatus] = useState<TDataStatus>("default");

	const resetPasswordSchema = createPasswordResetSchema({});

	const resetPasswordForm = useForm<TPasswordResetFields>({
		resolver: zodResolver(resetPasswordSchema),
		mode: "onSubmit",
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = resetPasswordForm.handleSubmit((data: TPasswordResetFields) => {
		console.log(data);
	});

	return (
		<section data-status={dataStatus} className={cn(_styles["wrapper"], styles["wrapper"])}>
			<span data-status={dataStatus} className={cn(_styles["border-line"], styles["border-line"])} />

			<FormProvider {...resetPasswordForm}>
				<form className={_styles["form"]} onSubmit={onSubmit}>
					<div className={styles["title-wrapper"]}>
						<div>
							<Title size="lg">{"Сброс пароля"}</Title>
							<p>{"Введите почту, которую вы указывали при регистрации. Мы отправим на нее код для сброса пароля"}</p>
						</div>

						<Image src="/assets/reset-password.webp" alt={"Иконка сброса пароля"} width={64} height={64} priority />
					</div>

					<FormInput name="email" placeholder={"Своя электронная почта"} containerClassName={styles["input-wrapper"]} />

					<div className={styles["actions-wrapper"]}>
						<Button variant="secondary" title={"Вернуться к странице входа в аккаунт"}>
							{"Войти в аккаунт"}
						</Button>

						<Button variant="secondary" title={"Отправить код на почту"} type="submit">
							{"Отправить код"}
						</Button>
					</div>
				</form>
			</FormProvider>
		</section>
	);
};

export { ResetPassword };
