"use client"

import { VALUES } from "@constants/base"
import { EnumAppRoute } from "@constants/routes"
import _styles from "@styles/modules/auth-form-wrapper.module.scss"
import { cn } from "@utils/base"
import { ShieldCheckIcon } from "lucide-react"
import ReCAPTCHA from "react-google-recaptcha"
import { FormProvider } from "react-hook-form"

import {
	Alert,
	AlertDescription,
	AlertTitle,
	Button
} from "@/components/ui/common"
import { Link } from "@/components/ui/common"
import { FormInput } from "@/components/ui/components/form-input"
import { FormBlock } from "@/components/ui/layouts"

import { Footer } from "./components/Footer"
import styles from "./styles/sign-in.module.scss"
import { useSignIn } from "./useSignIn"

const SignIn = () => {
	const {
		dataStatus,
		error,
		onSubmit,
		onCancelTgSignIn,
		form,
		onRecaptchaChange,
		theme,
		locale,
		t,
		isSignInLoading,
		recaptchaRef,
		isSuccess,
		isTgSignInLoading,
		isCancelTgSignInLoading
	} = useSignIn()

	return (
		<div
			data-status={dataStatus}
			className={cn(_styles["wrapper"], styles["wrapper"], {
				"!h-[12rem] !w-[35rem]": isSuccess
			})}
		>
			<span
				data-status={dataStatus}
				className={cn(_styles["border-line"], styles["border-line"], {
					"!h-[12rem] !w-[35rem]": isSuccess
				})}
			></span>

			<FormProvider {...form}>
				<form
					className={_styles["form"]}
					onSubmit={form.handleSubmit(onSubmit)}
				>
					{isSuccess ? (
						<>
							<Alert
								className={cn("mb-4 transition-opacity will-change-auto", {
									"opacity-80": isTgSignInLoading
								})}
							>
								<ShieldCheckIcon size={28} />

								<AlertTitle>{t("alert.title")}</AlertTitle>

								<AlertDescription>{t("alert.description")}</AlertDescription>
							</Alert>
							<Button
								className="w-fit self-end px-2 py-1.5"
								variant="destructive"
								disabled={
									isSignInLoading ||
									isTgSignInLoading ||
									isCancelTgSignInLoading
								}
								isLoading={isCancelTgSignInLoading}
								onClick={onCancelTgSignIn}
								title={t("alert.cancelBtn")}
								tabIndex={-1}
							>
								{t("alert.cancelBtn")}
							</Button>
						</>
					) : (
						<FormBlock
							title={t("title")}
							titleClassName={_styles["title"]}
							active
						>
							<FormInput
								type="text"
								name="id"
								label={t("form.id.label")}
								containerClassName="mb-12"
								tabIndex={1}
								isDecorated={true}
								required
							/>

							<FormInput
								type="password"
								name="password"
								label={t("form.password.label")}
								containerClassName="mb-8"
								maxLength={VALUES.MAX_PASSWORD_LENGTH}
								tabIndex={2}
								isDecorated={true}
								required
							/>

							<div className={styles["help-wrapper"]}>
								<Link href={EnumAppRoute.RESET_PASSWORD} tabIndex={3}>
									{t("footer.forgotPassword")}
								</Link>

								<Link href={EnumAppRoute.SIGN_UP} tabIndex={4}>
									{t("footer.noProfile")}
								</Link>
							</div>

							<ReCAPTCHA
								sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
								ref={recaptchaRef}
								className={styles["recaptcha"]}
								theme={theme}
								onChange={onRecaptchaChange}
								hl={locale}
								tabIndex={5}
							/>

							<Footer
								isError={error}
								isLoading={isSignInLoading}
								status={dataStatus}
								t={t}
								locale={locale}
							/>
						</FormBlock>
					)}
				</form>
			</FormProvider>
		</div>
	)
}

export { SignIn }
