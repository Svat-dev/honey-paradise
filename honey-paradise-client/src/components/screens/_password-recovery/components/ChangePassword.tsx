"use client";

import { Button, Title } from "@/components/ui/common";

import { FormInput } from "@/components/ui/components/form-input";
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
	const { form, dataStatus, onSubmit, isPasswordRecovering, t } = useChangePassword(token);

	return (
		<section data-status={dataStatus} className={cn(_styles["wrapper"], styles["wrapper"])}>
			<span data-status={dataStatus} className={cn(_styles["border-line"], styles["border-line"])} />

			<FormProvider {...form}>
				<form className={_styles["form"]} onSubmit={onSubmit}>
					<div className={styles["title-wrapper"]}>
						<div>
							<Title size="lg">{t("title")}</Title>
							<p>{t("description")}</p>
						</div>

						<Image src="/assets/reset-password.webp" alt={t("labels.image")} width={64} height={64} priority />
					</div>

					<FormInput
						name="password"
						type="password"
						placeholder={t("labels.inputPlaceholder")}
						containerClassName={styles["input-wrapper"]}
						maxLength={VALUES.MAX_PASSWORD_LENGTH}
						required
					/>

					<div className={styles["actions-wrapper"]}>
						<Button variant="secondary" title={t("labels.submitBtn")} type="submit" isLoading={isPasswordRecovering}>
							{t("submitBtn")}
						</Button>
					</div>
				</form>
			</FormProvider>
		</section>
	);
};

export { ChangePassword };
