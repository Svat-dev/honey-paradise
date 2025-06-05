"use client";

import { Button, Title } from "@/components/ui";

import { FormInput } from "@/components/ui/form-input/FormInput";
import { EnumAppRoute } from "@constants/routes";
import { VALUES } from "@schemas/sign-in.schema";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider } from "react-hook-form";
import styles from "./styles/sign-in.module.scss";
import { useSignIn } from "./useSignIn";

const SignIn = () => {
	const { dataStatus, error, onSubmit, signInForm, onRecaptchaChange, theme, locale, t } = useSignIn();

	return (
		<div data-status={dataStatus} className={styles["wrapper"]}>
			<span data-status={dataStatus} className={styles["border-line"]}></span>

			<FormProvider {...signInForm}>
				<form className={styles["form"]} onSubmit={signInForm.handleSubmit(onSubmit)}>
					<Title size="lg" className={styles["title"]}>
						{t("title")}
					</Title>

					<FormInput type="text" name="id" label={t("form.id.label")} containerClassName="tw-mb-12" required />
					<FormInput
						type="password"
						name="password"
						label={t("form.password.label")}
						containerClassName="tw-mb-8"
						maxLength={VALUES.MAX_PASSWORD_LENGTH}
						required
					/>

					<div className={styles["help-wrapper"]}>
						<Link href={EnumAppRoute.INDEX}>{t("footer.forgotPassword")}</Link>
						<Link href={EnumAppRoute.SIGN_UP}>{t("footer.noProfile")}</Link>
					</div>

					<ReCAPTCHA
						sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
						className={styles["recaptcha"]}
						theme={theme}
						onChange={onRecaptchaChange}
						hl={locale}
					/>

					<div className={styles["footer-wrapper"]}>
						<Button variant="secondary" type="submit">
							{t("footer.submitBtn")}
						</Button>

						{error && <p>{t("footer.error")}</p>}
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export { SignIn };
