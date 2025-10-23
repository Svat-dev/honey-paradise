import { Button, Separator, Skeleton, Title } from "@/components/ui/common";
import { LoaderIcon, RefreshCcwIcon } from "lucide-react";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";

import { FormInput } from "@/components/ui/components/form-input";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import slugify from "slugify";
import { useEmailSection } from "../../../hooks/useEmailSection";
import styles from "../../../styles/account.module.scss";
import _styles from "../../../styles/settings.module.scss";

interface IProps {
	email: string | undefined;
	isVerified: boolean | undefined;
	isAccLoading: boolean;
}

const EmailSection: FC<IProps> = ({ email, isVerified, isAccLoading }) => {
	const { form, isDisabled, onSubmit, emailUnique, isCheckingUnique, resetFields, confirmEmail, isEmailUpdating, t } =
		useEmailSection(email);

	const isLoading = isAccLoading || isEmailUpdating;

	return (
		<section className={styles["email-wrapper"]}>
			<FormProvider {...form}>
				<form onSubmit={onSubmit}>
					<div>
						<div>
							<Title size="sm">
								{t("email.title")}
								<a className="opacity-0 size-0" id={slugify(t("email.title"), { locale: "en", lower: true })} />
							</Title>

							{isLoading ? <Skeleton /> : <span data-verified={isVerified}>{t("email.verified", { isVerified: String(isVerified) })}</span>}
						</div>

						<Button variant="ghost" title={t("labels.resetFieldBtn")} disabled={isLoading} onClick={resetFields}>
							<RefreshCcwIcon size={20} />
						</Button>
					</div>

					<FormInput
						name="email"
						type="email"
						placeholder={t("email.placeholder")}
						isLoading={isAccLoading}
						errorClassName="!-bottom-4"
						containerClassName="mb-8 mt-3"
					>
						{emailUnique === true ? (
							<CheckmarkIcon className={_styles["unique-status-icon"]} />
						) : emailUnique === false ? (
							<ErrorIcon className={_styles["unique-status-icon"]} />
						) : emailUnique === "loading" ? (
							<LoaderIcon size={20} className={_styles["unique-status-loading-icon"]} />
						) : undefined}
					</FormInput>

					<div>
						<Separator />

						<div>
							<Button
								variant="secondary"
								title={t("labels.confirmEmailBtn")}
								onClick={confirmEmail}
								isLoading={isLoading}
								disabled={isLoading || isVerified}
							>
								{t("email.actions.confirmEmail")}
							</Button>

							<Button
								variant="secondary"
								type="submit"
								title={t("labels.changeEmailBtn")}
								isLoading={isLoading || isCheckingUnique}
								disabled={isLoading || isDisabled}
							>
								{t("email.actions.changeEmail")}
							</Button>
						</div>
					</div>
				</form>
			</FormProvider>
		</section>
	);
};

export { EmailSection };
