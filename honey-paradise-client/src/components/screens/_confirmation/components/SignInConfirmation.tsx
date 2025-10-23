"use client";

import { Button, Title } from "@/components/ui/common";

import { FormInput } from "@/components/ui/components/form-input";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import { cn } from "@utils/base";
import Image from "next/image";
import { FormProvider } from "react-hook-form";
import { useTFAConfirmation } from "../hooks/useTFAConfirmation";
import styles from "../styles/confirmation.module.scss";
import styles_ from "../styles/sign-in-confirmation.module.scss";

const SignInConfirmation = () => {
	const { cooldown, dataStatus, isLoading, form, t, refreshCode, limit, onSubmit, isTFACodeSending } = useTFAConfirmation();

	return (
		<section data-status={dataStatus} className={cn(_styles["wrapper"], styles_["wrapper"])}>
			<span data-status={dataStatus} className={cn(_styles["border-line"], styles_["border-line"])}></span>

			<FormProvider {...form}>
				<form className={_styles["form"]} onSubmit={onSubmit}>
					<div className={styles["title-wrapper"]}>
						<div>
							<Title size="lg" className="whitespace-nowrap">
								{t("2fa.title")}
							</Title>
							<p>{t("2fa.description.default")}</p>
						</div>

						<Image src="/assets/2fa-icon.webp" alt={""} width={90} height={90} className="mb-6" priority />
					</div>

					<FormInput
						name="pin"
						otpSlotsLimit={limit}
						containerClassName={styles["form-input-wrapper"]}
						errorClassName={styles["form-input-error"]}
						caretClassName="h-7"
						className={styles["form-input-slot"]}
					/>

					<div className={styles["actions-wrapper"]}>
						<Button
							variant="secondary"
							title={t("actions.resendBtn")}
							disabled={cooldown !== 0 || isLoading || isTFACodeSending}
							onClick={refreshCode}
							isLoading={isTFACodeSending}
						>
							{cooldown === 0 ? t("actions.resendBtn") : t("actions.resendBtnWithCooldown", { cooldown })}
						</Button>

						<Button
							variant="secondary"
							title={t("labels.submitBtn")}
							isLoading={isLoading}
							disabled={isLoading || isTFACodeSending}
							type="submit"
						>
							{t("actions.submitBtn")}
						</Button>
					</div>
				</form>
			</FormProvider>
		</section>
	);
};

export { SignInConfirmation };
