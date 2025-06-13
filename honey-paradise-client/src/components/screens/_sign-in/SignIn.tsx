"use client";

import { Button } from "@/components/ui";
import { FormInput } from "@/components/ui/form-input";
import { FormBlock } from "@/components/ui/layouts";
import { VALUES } from "@constants/base";
import { EnumAppRoute } from "@constants/routes";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import { cn } from "@utils/base";
import Link from "next/dist/client/link";
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider } from "react-hook-form";
import styles from "./styles/sign-in.module.scss";
import { useSignIn } from "./useSignIn";

const SignIn = () => {
	const { dataStatus, error, onSubmit, signInForm, onRecaptchaChange, theme, locale, t, isSignInLoading, recaptchaRef } = useSignIn();

	return (
		<div data-status={dataStatus} className={cn(_styles["wrapper"], styles["wrapper"])}>
			<span data-status={dataStatus} className={cn(_styles["border-line"], styles["border-line"])}></span>

			<FormProvider {...signInForm}>
				<form className={_styles["form"]} onSubmit={signInForm.handleSubmit(onSubmit)}>
					<FormBlock title={t("title")} titleClassName={_styles["title"]} active>
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
							ref={recaptchaRef}
							className={styles["recaptcha"]}
							theme={theme}
							onChange={onRecaptchaChange}
							hl={locale}
						/>

						<div className={styles["footer-wrapper"]}>
							<Button variant="secondary" type="submit" isLoading={isSignInLoading} disabled={dataStatus !== "default"}>
								{t("footer.submitBtn")}
							</Button>

							{error && <p>{t("footer.error")}</p>}
						</div>
					</FormBlock>
				</form>
			</FormProvider>
		</div>
	);
};

export { SignIn };
