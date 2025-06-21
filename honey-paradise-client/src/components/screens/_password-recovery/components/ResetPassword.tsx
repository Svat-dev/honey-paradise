"use client";

import { Button, Title } from "@/components/ui";

import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import { cn } from "@utils/base";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/reset-password.module.scss";

const ResetPassword = () => {
	const [dataStatus, setDataStatus] = useState<string>("");

	return (
		<section data-status={dataStatus} className={cn(_styles["wrapper"], styles["wrapper"])}>
			<span data-status={dataStatus} className={cn(_styles["border-line"], styles["border-line"])} />

			<form className={_styles["form"]}>
				<div className={styles["title-wrapper"]}>
					<div>
						<Title size="lg">{"Сброс пароля"}</Title>
						<p>{"Введите почту, которую вы указывали при регистрации. Мы отправим на нее код для сброса пароля"}</p>
					</div>

					<Image src="/assets/reset-password.webp" alt={"Иконка сброса пароля"} width={64} height={64} priority />
				</div>

				<div className={styles["actions-wrapper"]}>
					<Button variant="secondary" title={"Вернуться к странице входа в аккаунт"}>
						{"Войти в аккаунт"}
					</Button>

					<Button variant="secondary" title={"Отправить код на почту"} type="submit">
						{"Отправить код"}
					</Button>
				</div>
			</form>
		</section>
	);
};

export { ResetPassword };
