"use client";

import { Button } from "@/components/ui";
import type { FC } from "react";
import { FormBlock } from "@/components/ui/layouts";
import { FormInput } from "@/components/ui/form-input";
import { OptionalPartSection } from "./OptionalPartSection";
import ReCAPTCHA from "react-google-recaptcha";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import styles from "../styles/optional-part.module.scss";
import { useOptionalPart } from "../hooks/useOptionalPart";

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
					containerClassName="tw-mt-2 tw-mb-8"
				/>
			</OptionalPartSection>

			<OptionalPartSection title={t("optional_part.form.gender.title")}>
				<FormInput name="gender" data={data} containerClassName="tw-mt-2" />
			</OptionalPartSection>

			<OptionalPartSection title={t("optional_part.form.birthdate.title")}>
				<FormInput name="birthdate" containerClassName="tw-mt-2" />
			</OptionalPartSection>

			<div className={styles["recaptcha"]}>
				<ReCAPTCHA sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string} theme={theme} onChange={onRecaptchaChange} hl={locale} />

				{isError && <p>{t("footer.error")}</p>}
			</div>

			<div className={styles["footer"]}>
				<Button variant="secondary" className={styles["submit-btn"]} isLoading={isPending} disabled={disabled} type="submit">
					{t("footer.submitBtn")}
				</Button>

				<Button variant="secondary" className={styles["return-btn"]} onClick={onClickToPrevious}>
					{t("footer.backBtn")}
				</Button>
			</div>
		</FormBlock>
	);
};

export { OptionalPart };
