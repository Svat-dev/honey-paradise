import { Button } from "@/components/ui";
import { FormInput } from "@/components/ui/form-input";
import { FormBlock } from "@/components/ui/layouts";
import { VALUES } from "@constants/base";
import { EnumAppRoute } from "@constants/routes";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import Link from "next/dist/client/link";
import type { FC } from "react";
import styles from "../styles/main-part.module.scss";

interface IProps {
	onClickToNext: VoidFunction;
	isActive: boolean;
	disabled: boolean;
	t: any;
	isPending: boolean;
}

const MainPart: FC<IProps> = ({ onClickToNext, isActive, disabled, t, isPending }) => {
	return (
		<FormBlock title={t("main_part.title")} containerClassName={styles["section"]} titleClassName={_styles["title"]} active={isActive}>
			<FormInput
				name="email"
				type="email"
				label={t("main_part.form.email.label")}
				placeholder={t("main_part.form.email.placeholder")}
				containerClassName="tw-mb-12"
				tabIndex={0}
				spellCheck={false}
				required
			/>

			<FormInput
				name="password"
				type="password"
				label={t("main_part.form.password.label")}
				placeholder={t("main_part.form.password.placeholder")}
				containerClassName="tw-mb-12"
				maxLength={VALUES.MAX_PASSWORD_LENGTH}
				tabIndex={1}
				spellCheck={false}
				required
			/>

			<FormInput
				name="confirmPassword"
				type="password"
				label={t("main_part.form.confirmPassword.label")}
				placeholder={t("main_part.form.confirmPassword.placeholder")}
				containerClassName="tw-mb-12"
				maxLength={VALUES.MAX_PASSWORD_LENGTH}
				tabIndex={2}
				spellCheck={false}
				required
			/>

			<div className={styles["footer"]}>
				<Button variant="secondary" onClick={onClickToNext} disabled={disabled} isLoading={isPending} tabIndex={4}>
					{t("footer.continueBtn")}
				</Button>

				<Link href={EnumAppRoute.SIGN_IN} tabIndex={3}>
					{t("footer.haveProfile")}
				</Link>
			</div>
		</FormBlock>
	);
};

export { MainPart };
