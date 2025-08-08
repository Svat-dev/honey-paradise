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
import styles from "../styles/confirmation.module.scss";

interface IEmailConfirmation {
	utm_source?: EnumAppRoute;
}

const EmailConfirmation: FC<IEmailConfirmation> = ({ utm_source }) => {
	const { dataStatus, t, form, onSubmit, limit, cooldown, refreshCode, isLoading, isFromSignIn, isFromAccount, isCodeSending } =
		useEmailConfirmation(utm_source);

	return (
		<section
			data-status={dataStatus}
			className={cn(_styles["wrapper"], styles["wrapper"], { "!tw-h-[21rem] before:!tw-h-[21rem] after:!tw-h-[21rem]": !!utm_source })}
		>
			<span
				data-status={dataStatus}
				className={cn(_styles["border-line"], styles["border-line"], { "before:!tw-h-[21rem] after:!tw-h-[21rem]": !!utm_source })}
			/>

			<FormProvider {...form}>
				<form className={_styles["form"]} onSubmit={onSubmit}>
					<div className={styles["title-wrapper"]}>
						<div>
							<Title size="lg">{t("email.title")}</Title>
							<p>
								{isFromSignIn
									? t("email.description.notVerified")
									: isFromAccount
									? t("email.description.default")
									: t("email.description.signUp")}
							</p>
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

					{!isFromSignIn && !isFromAccount && (
						<Checkbox containerClassName={styles["checkbox-wrapper"]} {...form.register("signInAfter")}>
							{t("email.signInAfter")}
						</Checkbox>
					)}

					<div className={styles["actions-wrapper"]}>
						<Button
							variant="secondary"
							title={t("actions.resendBtn")}
							disabled={cooldown !== 0 || isLoading || isCodeSending}
							onClick={refreshCode}
							isLoading={isCodeSending}
						>
							{cooldown === 0 ? t("actions.resendBtn") : t("actions.resendBtnWithCooldown", { cooldown })}
						</Button>

						<Button
							variant="secondary"
							title={t("labels.submitBtn")}
							disabled={isCodeSending || isLoading}
							isLoading={isLoading}
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

export { EmailConfirmation };
