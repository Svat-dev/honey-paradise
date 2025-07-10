"use client";

import type { TDataStatus } from "../types/confirmation.type";
import { Title } from "@/components/ui/common";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import { cn } from "@utils/base";
import styles from "../styles/sign-in-confirmation.module.scss";
import { useState } from "react";

const SignInConfirmation = () => {
	const [dataStatus, setDataStatus] = useState<TDataStatus>("default");

	return (
		<section data-status={dataStatus} className={cn(_styles["wrapper"], styles["wrapper"])}>
			<span data-status={dataStatus} className={cn(_styles["border-line"], styles["border-line"])}></span>

			<form className={_styles["form"]}>
				<Title size="lg" className={_styles["title"]}>
					{"Двухфакторная аутентификация"}
				</Title>
				<p>{"Вы почти вошли в аккаунт. Мы уже отправили код вам на почту, проверьте ее"}</p>
			</form>
		</section>
	);
};

export { SignInConfirmation };
