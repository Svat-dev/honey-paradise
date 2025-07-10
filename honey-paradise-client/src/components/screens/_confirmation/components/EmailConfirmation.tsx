"use client";

import { Button, Checkbox, Title } from "@/components/ui/common";

import { FormInput } from "@/components/ui/components/form-input";
import { EnumAppRoute } from "@/shared/lib/constants/routes";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import { cn } from "@utils/base";
import Image from "next/image";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import { useEmailConfirmation } from "../hooks/useEmailConfirmation";
import styles from "../styles/email-confirmation.module.scss";

interface IEmailConfirmation {
	utm_source?: EnumAppRoute;
}

const EmailConfirmation: FC<IEmailConfirmation> = ({ utm_source }) => {
	const { dataStatus, t, confirmationForm, onSubmit, limit, cooldown, refreshCode, isLoading, isFromSignIn } =
		useEmailConfirmation(utm_source);

	return (
		<section
			data-status={dataStatus}
			className={cn(_styles["wrapper"], styles["wrapper"], { "!tw-h-[21rem] before:!tw-h-[21rem] after:!tw-h-[21rem]": isFromSignIn })}
		>
			<span
				data-status={dataStatus}
				className={cn(_styles["border-line"], styles["border-line"], { "before:!tw-h-[21rem] after:!tw-h-[21rem]": isFromSignIn })}
			/>

			<FormProvider {...confirmationForm}>
				<form className={_styles["form"]} onSubmit={onSubmit}>
					<div className={styles["title-wrapper"]}>
						<div>
							<Title size="lg">{t("email.title")}</Title>
							<p>{isFromSignIn ? t("email.description.notVerified") : t("email.description.default")}</p>
						</div>

						<Image src="/assets/pincode-entering-icon.webp" alt={""} width={80} height={80} priority />
					</div>

					<FormInput
						name="pin"
						otpSlotsLimit={limit}
						containerClassName={styles["form-input-wrapper"]}
						errorClassName={styles["form-input-error"]}
						caretClassName="tw-h-7"
						className={styles["form-input-slot"]}
					/>

					{!isFromSignIn && (
						<Checkbox containerClassName={styles["checkbox-wrapper"]} {...confirmationForm.register("signInAfter")}>
							{t("email.signInAfter")}
						</Checkbox>
					)}

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
