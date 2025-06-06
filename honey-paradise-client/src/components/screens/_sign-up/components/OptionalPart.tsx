"use client";

import { Button } from "@/components/ui";
import type { FC } from "react";
import { FormBlock } from "@/components/ui/layouts";
import { FormInput } from "@/components/ui/form-input";
import { OptionalPartSection } from "./OptionalPartSection";
import ReCAPTCHA from "react-google-recaptcha";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import styles from "../styles/optional-part.module.scss";
import { useLocale } from "next-intl";
import { useTheme } from "@/shared/lib/hooks/useTheme";

interface IProps {
	isActive: boolean;
	onClickToPrevious: VoidFunction;
	onRecaptchaChange: (token: string | null) => void;
	isError: boolean;
}

const OptionalPart: FC<IProps> = ({ isActive, onClickToPrevious, onRecaptchaChange, isError }) => {
	const { theme } = useTheme();
	const locale = useLocale();

	return (
		<FormBlock
			title={"Дополнительная информация"}
			containerClassName={styles["section"]}
			titleClassName={_styles["title"]}
			active={isActive}
		>
			<OptionalPartSection title={"Придумайте имя пользователя"}>
				<FormInput name="username" type="text" label="Имя пользователя" containerClassName="tw-mt-2" />
			</OptionalPartSection>

			<OptionalPartSection title={"Выберите пол"}>
				<FormInput name="gender" containerClassName="tw-mt-2" />
			</OptionalPartSection>

			<OptionalPartSection title={"Укажите дату рождения"}>
				<FormInput name="birthdate" containerClassName="tw-mt-2" />
			</OptionalPartSection>

			<div className={styles["recaptcha"]}>
				<ReCAPTCHA sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string} theme={theme} onChange={onRecaptchaChange} hl={locale} />
				{isError && <p>reCAPTCHA not done</p>}
			</div>

			<div className={styles["footer"]}>
				<Button variant="secondary" className={styles["return-btn"]} type="submit">
					{"Создать аккаунт"}
				</Button>

				<Button variant="secondary" className={styles["submit-btn"]} onClick={onClickToPrevious}>
					{"Вернуться"}
				</Button>
			</div>
		</FormBlock>
	);
};

export { OptionalPart };
