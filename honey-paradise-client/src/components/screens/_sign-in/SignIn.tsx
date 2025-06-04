"use client";

import { Button, Title } from "@/components/ui";

import { FormInput } from "@/components/ui/form-input/FormInput";
import { EnumAppRoute } from "@constants/routes";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider } from "react-hook-form";
import styles from "./styles/sign-in.module.scss";
import { useSignIn } from "./useSignIn";

const SignIn = () => {
	const { dataStatus, error, onSubmit, signInForm, onRecaptchaChange, theme } = useSignIn();

	return (
		<div data-status={dataStatus} className={styles["wrapper"]}>
			<span data-status={dataStatus} className={styles["border-line"]}></span>
			<FormProvider {...signInForm}>
				<form className={styles["form"]} onSubmit={signInForm.handleSubmit(onSubmit)}>
					<Title size="lg" className="tw-w-full tw-text-center tw-mb-10">
						Вход в аккаунт
					</Title>

					<FormInput type="text" name="id" label={"Email или имя пользователя"} containerClassName="tw-mb-12" required />
					<FormInput type="password" name="password" label={"Пароль"} containerClassName="tw-mb-8" required />

					<div className={styles["help-wrapper"]}>
						<Link href={EnumAppRoute.INDEX}>Забыли пароль?</Link>
						<Link href={EnumAppRoute.SIGN_UP}>Нет профиля? Создайте</Link>
					</div>

					<ReCAPTCHA
						sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
						className={styles["recaptcha"]}
						theme={theme}
						onChange={onRecaptchaChange}
					/>

					<div className={styles["footer-wrapper"]}>
						<Button variant="secondary" type="submit">
							Войти в аккаунт
						</Button>

						{error && <p>Вы возможно робот! Пройдите капчу еще раз</p>}
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export { SignIn };
