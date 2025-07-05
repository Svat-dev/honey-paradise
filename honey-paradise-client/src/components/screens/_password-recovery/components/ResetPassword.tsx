"use client";

import { Alert, AlertDescription, AlertTitle, Button, Title } from "@/components/ui";

import { CheckCircle2Icon } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormProvider } from "react-hook-form";
import Image from "next/image";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import { cn } from "@utils/base";
import styles from "../styles/reset-password.module.scss";
import { useResetPassword } from "../hooks/useResetPassword";

const ResetPassword = () => {
	const { isCodeSending, onSubmit, dataStatus, isSuccess, form, resendCode, cooldown, t } = useResetPassword();

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

					{isSuccess ? (
						<>
							<Alert className={styles["alert"]}>
								<CheckCircle2Icon />

								<AlertTitle>{t("alert.title")}</AlertTitle>
								<AlertDescription>{t("alert.description")}</AlertDescription>
							</Alert>

							<Button variant="link" className="tw-self-start tw-ml-1" onClick={resendCode}>
								{t("alert.resendBtn")}
							</Button>
						</>
					) : (
						<>
							<FormInput name="email" placeholder={t("labels.inputPlaceholder")} containerClassName={styles["input-wrapper"]} required />

							<div className={styles["actions-wrapper"]}>
								<Button variant="secondary" title={t("labels.toAuthBtn")} disabled={isSuccess || isCodeSending}>
									{t("actions.toAuthBtn")}
								</Button>

								<Button variant="secondary" title={t("labels.submitBtn")} type="submit" disabled={cooldown !== 0} isLoading={isCodeSending}>
									{cooldown === 0 ? t("actions.submitBtn") : t("actions.submitBtnCooldown", { cooldown })}
								</Button>
							</div>
						</>
					)}
				</form>
			</FormProvider>
		</section>
	);
};

export { ResetPassword };
