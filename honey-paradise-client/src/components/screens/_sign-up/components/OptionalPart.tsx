"use client";

import { Button } from "@/components/ui/common";
import { FormInput } from "@/components/ui/components/form-input";
import { FormBlock } from "@/components/ui/layouts";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import type { FC } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useOptionalPart } from "../hooks/useOptionalPart";
import styles from "../styles/optional-part.module.scss";
import { OptionalPartSection } from "./OptionalPartSection";

interface IProps {
	isActive: boolean;
	onClickToPrevious: VoidFunction;
	onRecaptchaChange: (token: string | null) => void;
	isError: boolean;
	isPending: boolean;
	disabled: boolean;
}

const OptionalPart: FC<IProps> = ({ isActive, onClickToPrevious, onRecaptchaChange, isError, isPending, disabled }) => {
	const { data, locale, t, theme } = useOptionalPart();

	return (
		<FormBlock title={t("optional_part.title")} containerClassName={styles["section"]} titleClassName={_styles["title"]} active={isActive}>
			<OptionalPartSection title={t("optional_part.form.username.title")}>
				<FormInput
					name="username"
					type="text"
					label={t("optional_part.form.username.title")}
					placeholder={t("optional_part.form.username.placeholder")}
					containerClassName="mt-2 mb-8"
					isDecorated
					tabIndex={0}
				/>
			</OptionalPartSection>

			<OptionalPartSection title={t("optional_part.form.gender.title")}>
				<FormInput name="gender" genderType="radio-group" data={data} containerClassName="mt-2" tabIndex={1} />
			</OptionalPartSection>

			<OptionalPartSection title={t("optional_part.form.birthdate.title")}>
				<FormInput
					name="birthdate"
					containerClassName="mt-2"
					dateConfig={{ dateMax: new Date().getTime() - 14 * 365 * 24 * 60 * 60 * 1000 }}
					tabIndex={2}
				/>
			</OptionalPartSection>

			<div className={styles["recaptcha"]}>
				<ReCAPTCHA
					sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
					theme={theme}
					onChange={onRecaptchaChange}
					hl={locale}
					tabIndex={3}
				/>

				{isError && <p>{t("footer.error")}</p>}
			</div>

			<div className={styles["footer"]}>
				<Button variant="secondary" className={styles["submit-btn"]} isLoading={isPending} disabled={disabled} tabIndex={5} type="submit">
					{t("footer.submitBtn")}
				</Button>

				<Button variant="secondary" className={styles["return-btn"]} onClick={onClickToPrevious} tabIndex={4}>
					{t("footer.backBtn")}
				</Button>
			</div>
		</FormBlock>
	);
};

export { OptionalPart };
