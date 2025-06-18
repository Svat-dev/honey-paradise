"use client";

import { Button, Checkbox, Title } from "@/components/ui";

import { FormInput } from "@/components/ui/form-input";
import { FormProvider } from "react-hook-form";
import Image from "next/image";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import { cn } from "@utils/base";
import styles from "../styles/email-confirmation.module.scss";
import { useEmailConfirmation } from "../hooks/useEmailConfirmation";

const EmailConfirmation = () => {
	const { dataStatus, t, confirmationForm, onSubmit, limit, cooldown, refreshCode, isLoading } = useEmailConfirmation();

	return (
		<section data-status={dataStatus} className={cn(_styles["wrapper"], styles["wrapper"])}>
			<span data-status={dataStatus} className={cn(_styles["border-line"], styles["border-line"])} />

			<FormProvider {...confirmationForm}>
				<form className={_styles["form"]} onSubmit={onSubmit}>
					<div className={styles["title-wrapper"]}>
						<div>
							<Title size="lg">{t("email.title")}</Title>
							<p>{t("email.description")}</p>
						</div>

						<Image src="/assets/pincode-entering-icon.png" alt={""} width={80} height={80} priority />
					</div>

					<FormInput
						name="pin"
						otpSlotsLimit={limit}
						containerClassName={styles["form-input-wrapper"]}
						errorClassName={styles["form-input-error"]}
						caretClassName="tw-h-7"
						className={styles["form-input-slot"]}
					/>

					<Checkbox containerClassName={styles["checkbox-wrapper"]} {...confirmationForm.register("signInAfter")}>
						{t("email.signInAfter")}
					</Checkbox>

					<div className={styles["actions-wrapper"]}>
						<Button variant="secondary" disabled={cooldown !== 0} onClick={refreshCode} isLoading={isLoading && cooldown !== 0}>
							{cooldown === 0 ? t("email.actions.resendBtn") : t("email.actions.resendBtnWithCooldown", { cooldown })}
						</Button>

						<Button variant="secondary" title={t("email.labels.submitBtn")} isLoading={isLoading} type="submit">
							{t("email.actions.submitBtn")}
						</Button>
					</div>
				</form>
			</FormProvider>
		</section>
	);
};

export { EmailConfirmation };
